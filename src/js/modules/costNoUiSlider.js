export function costNoUiSlider() {
  //ползунки
  const costCarRange = document.getElementById('costCar');
  const contributionCarRange = document.getElementById('contributionCar');
  const timeCarRange = document.getElementById('timeCar');
  const rangeAll = document.querySelectorAll('.cost__slider');

  //инпуты
  const costCarInput = document.getElementById('costCarInput');

  const percentCarInput = document.getElementById('percentCarInput');
  const contributionCarInput = document.getElementById('contributionCarInput');

  const timeCarInput = document.getElementById('timeCarInput');

  const inputsAll = document.querySelectorAll('.input-js');

  const paymentCarInput = document.getElementById('paymentCarInput');
  const leasingCarInput = document.getElementById('leasingCarInput');

  const allRanges = () => {
    costCarInput.value = costCarRange.value;
    percentCarInput.value = contributionCarRange.value;
    timeCarInput.value = timeCarRange.value;
    contributionCarInput.value = Math.round(((costCarInput.value / 100) * percentCarInput.value) / 100) * 100;
  };

  const allInputs = () => {
    costCarRange.value = costCarInput.value;
    contributionCarRange.value = percentCarInput.value;
    timeCarRange.value = timeCarInput.value;
  };

  for (const range of rangeAll) {
    range.addEventListener('input', () => {
      allRanges();
      calculation();
    });
  }

  for (const input of inputsAll) {
    input.addEventListener('input', () => {
      allInputs();
      calculation();
    });
  }

  const calculation = () => {
    let price = Number(costCarInput.value);
    let initial = Number(contributionCarInput.value);
    let months = Number(timeCarInput.value);

    const monthPay = (price - initial) * ((0.035 * Math.pow(1 + 0.035, months)) / (Math.pow(1 + 0.035, months) - 1));

    const monthPayCurrent = Math.round(monthPay / 100) * 100;

    const sumLeasing = months * monthPayCurrent + initial;
    const sumLeasingCurrent = Math.round(sumLeasing / 100) * 100;

    paymentCarInput.value = monthPayCurrent;
    leasingCarInput.value = sumLeasingCurrent;
  };

  //отправка формы

  const form = document.querySelector('.cost__form');
  const btnSend = document.querySelector('.cost__btn');
  const loading = document.querySelector('.loading-svg');

  async function formSend(e) {
    e.preventDefault();
    let formData = new FormData(form);

    const formJSON = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(formJSON, null, 2));

    btnSend.classList.add('active');
    loading.classList.add('active');

    let response = await fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'formData',
    });

    if (response.ok) {
      let result = await response.json();
      form.reset();
      btnSend.classList.remove('active');
      loading.classList.remove('active');
      console.log(result.message);
    } else {
      btnSend.classList.remove('active');
      loading.classList.remove('active');
      console.log('error');
    }
  }

  form.addEventListener('submit', formSend);
}
