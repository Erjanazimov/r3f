import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchCurrency = createAsyncThunk(
    "currency/fetchCurrency",
    async function(_, {rejectWithValue, dispatch}){
        try {
            const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
            if (!response.ok){
                throw new Error("Что то пошло не так")
            }
            const data = await response.json();

            dispatch(addCurrency({data}))
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencyData: [],
        searchText: "",
        searchRes: []
    },
    reducers: {
        addCurrency(state,action){
            for (let population in action.payload.data.Valute) {
                if (action.payload.data.Valute.hasOwnProperty(population)) {
                    state.currencyData.push({...action.payload.data.Valute[population], rub: 1, nameRub: "RUB"})
                }
            }
        },
        currentRub(state, action){
            state.currencyData.map(id => {
                id["nameRub"] = action.payload.item.CharCode;
                id["rub"] = action.payload.item.Valute;
                id["CharCode"] = action.payload.item.nameRub;
                id["Valute"] = action.payload.item.rub
            });
        },
        searchHandler(state, action){
            state.searchText = action.payload.text;
        },
        searchResult(state, action){
            state.searchRes = action.payload.data;
        },
        searchRevers(state, action){
            state.searchRes.map(id => {
                id["nameRub"] = action.payload.item.CharCode;
                id["rub"] = action.payload.item.Previous;
                id["CharCode"] = action.payload.item.nameRub;
                id["Valute"] = action.payload.item.rub
            });
        },
        nullData(state, action){
            state.currencyData = []
        }
    }
})

export const {addCurrency, currentRub, searchHandler, searchResult, searchRevers, nullData} = currencySlice.actions;

export default currencySlice.reducer;