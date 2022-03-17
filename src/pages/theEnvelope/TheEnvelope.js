import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrency, nullData} from "../../store/currencySlice";

const TheEnvelope = () => {
    const stateList = useSelector(state => state.currency);
    const dispatch = useDispatch();
    useEffect(() => {
        if (stateList.currencyData.length < 34) {
            dispatch(fetchCurrency())
        }else if (stateList.length === 34){
            dispatch(nullData())
        }
    }, [])

    return (
        <div className="mt-3">
            <div className="input-group mb-3">
                <span className="input-group-text hg">
                  <select className="form-select" aria-label="Default select example">
                      {stateList.currencyData.map(item => {
                          return <option key={item.id} value="1">{item.CharCode}</option>
                      })}

                    </select>
                </span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username"/>
                    <span className="input-group-text hg"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                                            fill="currentColor" className="bi bi-arrow-left-right"
                                                            viewBox="0 0 16 16"> <path fillRule="evenodd"
                        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    </span>
                    <input type="text" className="form-control" placeholder="Server" aria-label="Server"/>
                <span className="input-group-text hg">
                   <select className="form-select" aria-label="Default select example">
                      {stateList.currencyData.map(item => {
                          return <option key={item.id} value="1">{item.CharCode}</option>
                      })}
                    </select>
                </span>
            </div>
        </div>
    );
};

export default TheEnvelope;