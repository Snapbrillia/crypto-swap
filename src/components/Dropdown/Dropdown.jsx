import React, { useRef, useState, useEffect } from 'react';
import selectIcon from '../../assets/selectIcon.svg';

import './style.css';

import { useOnClickOutside } from '../../hook/useOnClickOutside';
import { useDebounce } from '../../hook/useDebounce';

export const Dropdown = ({ currencies, onChange, value, disabled }) => {
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [openSelector, setOpenSelector] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setOpenSelector(false));
  const debouncedFilterCurrency = useDebounce(filterText, 200);


  useEffect(() => {
    if (value && currencies) {
      const defaultSelected = currencies.find((x) => {
        return x.ticker === value;
      })
      if (defaultSelected) {
        setSelectedCurrency(defaultSelected);
      }
    }
    if (currencies) {
      setFilteredCurrencies(currencies);
    }
  }, []);

  useEffect(() => {
    if (value && currencies) {
      const defaultSelected = currencies.find((x) => {
        return x.ticker === value;
      })
      if (defaultSelected) {
        setSelectedCurrency(defaultSelected);
      }
    }
  }, [value]);

  useEffect(() => {
    if (debouncedFilterCurrency) {
      setFilteredCurrencies(currencies.filter((x) => {
        return x.ticker.includes(debouncedFilterCurrency);
      }))
    } else {
      setFilteredCurrencies(currencies);
    }
  }, [debouncedFilterCurrency])
  return (
    <div id="custom-selector-dropdown" className="custom-selector">
      {
        !openSelector && (
          <div className="button-selector" onClick={() => {
            if (!disabled) {
              setOpenSelector(true);
            }
          }}>
            <label className="label-selector">
              <div className="label-content">
                <div className="image">
                  <img alt="" src={selectedCurrency.image} />
                </div>
                <span className="ticker">{selectedCurrency.ticker}</span>
              </div>
            </label>
            <img alt="" src={selectIcon} className="icon-selector" />
          </div>
        )
      }
      {
        openSelector && (
          <div className="currency-selector" ref={ref}>
            <input className="search search_big" placeholder="Type a currency" value={filterText} onChange={(e) => { setFilterText(e.target.value) }} />
            <ul className="currencies-list">
              <div className="group-name">Popular Currencies</div>
              {
                filteredCurrencies.map((currency, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        onChange(currency);
                        setOpenSelector(false);
                      }}>
                      <div className="image">
                        <img src={currency.image} alt="btc" />
                      </div>
                      <div className="currency">
                        <div className="ticker">
                          <span className="ticker-name">{currency.ticker}</span>
                        </div>
                        <span className="name">{currency.name}</span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}
