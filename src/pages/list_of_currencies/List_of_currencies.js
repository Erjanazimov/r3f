import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currentRub, fetchCurrency, searchHandler, searchResult, searchRevers} from "../../store/currencySlice";

const ListOfCurrencies = () => {
    const stateList = useSelector(state => state.currency);
    const dispatch = useDispatch();

    useEffect(() => {
        if (stateList.currencyData.length < 34) {
            dispatch(fetchCurrency())
        }
    }, [])

    const reverseCurrent = (item) => {
        dispatch(currentRub({item}))
    }

    const searchChange = (e) => {
        dispatch(searchHandler({text: e.target.value}));
    }

    useEffect(() => {
        const res = stateList.currencyData.filter(item => item.Name.slice(0, stateList.searchText.length).toLowerCase() === stateList.searchText);

        dispatch(searchResult({ data: res }))
    }, [stateList.searchText])

    const reverseCurrentSearch = (item) => {
        dispatch(searchRevers({item}))
    }

    return (
        <div className="container">
            <div className="input-group mb-3 mt-2">
                <input onChange={searchChange} type="text" className="form-control" placeholder="Поиск валюты введите текст"
                       aria-label="Recipient's username" aria-describedby="button-addon2" value={stateList.searchText}/>
            </div>
            <div className="flex">

                {stateList.searchRes.length ?
                    stateList.searchRes.map((item, index) => {
                        return <div key={index} className="currencies">
                            <p>{item.Name} </p>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <b>{item.Nominal} {item.CharCode}</b> <span
                                    onClick={() => reverseCurrentSearch(item)} className="hg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="26" fill="currentColor"
                                   className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                  <path fillRule="evenodd"
                                        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                          </svg> </span> <b>{item.nameRub !== "RUB" ? `${1 / item.Value}`.slice(0,7) + " " + item.nameRub :
                                    `${item.Value} ${item.nameRub}` }</b>
                                </div>
                                <div>

                                    { item.nameRub !== "RUB" ?
                                        null
                                        : function() {
                                            let resSuma = `${item.Value - item.Previous}`;
                                            if (resSuma.slice(0, 1) === "-") {
                                                return <span className="bgVniz"> {resSuma.slice(0, 7)}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-arrow-down"
                                                         viewBox="0 0 16 16">
                                              <path fillRule="evenodd"
                                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                          </svg>
                                          </span>
                                            } else {
                                                return <span className="bgActive"> {resSuma.slice(0, 7)}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-arrow-up"
                                                         viewBox="0 0 16 16">
                                              <path fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                          </svg>
                                          </span>
                                            }
                                        }()}
                                </div>
                            </div>
                        </div>

                    }) : null
                }
                {stateList.currencyData.length && !stateList.searchRes.length ?
                    stateList.currencyData.map((item, index) => {
                      return <div key={index} className="currencies">
                          <p>{item.Name} </p>
                          <div className="d-flex justify-content-between">
                          <div>
                              <b>{item.Nominal} {item.CharCode}</b> <span
                              onClick={() => reverseCurrent(item)} className="hg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="26" fill="currentColor"
                                   className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                  <path fillRule="evenodd"
                                        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                          </svg> </span> <b>{item.nameRub !== "RUB" ? `${1 / item.Value}`.slice(0,7) + " " + item.nameRub :
                              `${item.Value} ${item.nameRub}` }</b>
                          </div>
                              <div>

                                  { item.nameRub !== "RUB" ?
                                     function (){

                                     }()
                                      : function() {
                                              let resSuma = `${item.Value - item.Previous}`;
                                              if (resSuma.slice(0, 1) === "-") {
                                                  return <span className="bgVniz"> {resSuma.slice(0, 7)}
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                           fill="currentColor" className="bi bi-arrow-down"
                                                           viewBox="0 0 16 16">
                                              <path fillRule="evenodd"
                                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                          </svg>
                                          </span>
                                              } else {
                                                  return <span className="bgActive"> {resSuma.slice(0, 7)}
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                           fill="currentColor" className="bi bi-arrow-up"
                                                           viewBox="0 0 16 16">
                                              <path fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                          </svg>
                                          </span>
                                              }
                                          }()}
                              </div>
                          </div>
                      </div>

                    })

                    : null
                }
            </div>
        </div>
    );
};

export default ListOfCurrencies;