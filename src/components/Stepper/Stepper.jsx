import React, { useState, useEffect } from 'react';

import './style.css';
import close from '../../assets/close.svg';

import { StepOne } from './StepOne.jsx';
import { StepTwo } from './StepTwo.jsx';
import { StepThree } from './StepThree.jsx';
import { useSnapbrilliaContext } from '../../context/SnapbrilliaContext.jsx';

export const Stepper = () => {
  const [step, setStep] = useState(1);
  const { values, closeModal, isOpenModal } = useSnapbrilliaContext();

  const stepInfos = [
    {
      title: 'Enter Exchange Details',
      description: 'Please enter the details of your exchange',
    },
    {
      title: 'Confirm the Exchange',
      description: 'Please confirm the details of your exchange',
    },
    {
      title: 'Complete the Exchange',
      description: 'Please send the funds you would like to exchange',
    },
  ];

  const nextStep = () => {
    setStep(x => x + 1);
  }
  useEffect(() => {
    if (values.id) {
      setStep(3)
    }
  }, []);
  return (
    <>
      <div className="stepper">
        <div className="stepper__step">
          <div className="first-step">
            <div className="stepper__header-panel header-panel">
              <div className="header-panel__content">
                {stepInfos[step - 1].description}
              </div>
              <button className="header-panel__button-close" type="button" onClick={closeModal}>
                <img src={close} alt="close icon" />
              </button>
            </div>
            {step === 1 && <StepOne nextStep={nextStep}/>}
            {step === 2 && <StepTwo nextStep={nextStep}/>}
            {step === 3 && <StepThree />}
          </div>
        </div>
      </div>
      <div className="stepper__stepper-steps stepper-steps">
        {stepInfos.map((stepInfo, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={index}
              className={`stepper-steps__step ${stepNumber === step ? 'stepper-steps__step_active' : ''
                }`}
            >
              <div className="step__number">{stepNumber}</div>
              <div className="step__title">{stepInfo.title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
