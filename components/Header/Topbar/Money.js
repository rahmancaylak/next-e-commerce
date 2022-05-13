import React, { useRef, useEffect } from 'react';
// Icons
import { MdKeyboardArrowDown } from 'react-icons/md';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  showMoneyDropDown,
  changeMoney,
  closeMoneyDropDown,
} from '../../../redux/states/header/topBar/topBar.js';
// Tailwind Styled Components
import {
  MoneySection,
  MoneyButton,
  DropDownMoney,
  MoneyList,
  ChooseMoney,
} from '../../../styles/Header/topBar';
// Animation
import { motion, AnimatePresence } from 'framer-motion';

export default function Money() {
  const ref = useRef();
  const dispatch = useDispatch();
  const moneyDropDownCheck = useSelector((state) => state.topBar.moneyDropDown);
  const Money = useSelector((state) => state.topBar.money);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        dispatch(closeMoneyDropDown());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <>
      <MoneySection ref={ref}>
        <MoneyButton onClick={() => dispatch(showMoneyDropDown())}>
          <h5 className='flex items-center'>
            {Money}{' '}
            <MdKeyboardArrowDown
              size={20}
              className={`${
                moneyDropDownCheck && 'rotate-180'
              } ease-in-out duration-300 `}
            />
          </h5>
        </MoneyButton>
        <AnimatePresence>
          {moneyDropDownCheck && (
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              animate={{ opacity: 1, y: 30 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DropDownMoney>
                <ChooseMoney>
                  <MoneyList
                    $isActive={Money === '$'}
                    onClick={() =>
                      dispatch(changeMoney('$'), dispatch(showMoneyDropDown()))
                    }
                  >
                    $ Dolar
                  </MoneyList>
                  <MoneyList
                    $isActive={Money === '₺'}
                    onClick={() =>
                      dispatch(changeMoney('₺'), dispatch(showMoneyDropDown()))
                    }
                  >
                    ₺ TL
                  </MoneyList>
                  <MoneyList
                    $isActive={Money === '€'}
                    onClick={() =>
                      dispatch(changeMoney('€'), dispatch(showMoneyDropDown()))
                    }
                  >
                    € Euro
                  </MoneyList>
                </ChooseMoney>
              </DropDownMoney>
            </motion.div>
          )}
        </AnimatePresence>
      </MoneySection>
    </>
  );
}
