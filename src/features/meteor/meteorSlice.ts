import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {Meteor} from "./types";
import {fetchMeteors} from "./meteorAPI";

const  LOADING:string = 'loading';
const  FAILED:string = 'failed';
const  SUCCESS:string = 'success';
const METEOR_FETCH:string = 'meteor/fetchMeteor';

export interface MeteorState {
  meteors: Meteor[];
  status:string;
  byYearFilter: string;
  byMassFilter: string;//Filter;
  showNotification:boolean;
}

const initialState: MeteorState = {
  meteors: [],
  status: LOADING,
  byYearFilter:'',
  byMassFilter: '',
  showNotification : false
};


export const fetchMeteorAsync = createAsyncThunk(
    METEOR_FETCH,
  async () => {
    const response = await fetchMeteors();

    return (await response.json()) as Meteor[];
  }
);

export const meteorSlice = createSlice({
  name: 'meteor',
  initialState,

  reducers: {
    updateByYearFilter: (state:MeteorState, action:PayloadAction<string>) => {
      state.byYearFilter = action.payload;
    },
    updateByMassFilter: (state:MeteorState,action:PayloadAction<string>) => {
      state.byMassFilter = action.payload;
    },
    calculateFilter:(state:MeteorState) => {
        if(state.byYearFilter && state.byMassFilter) {
             const filteredByMassMeteors = selectFilteredMeteorsByMass(state)
             if(filteredByMassMeteors.length) {
                 state.byYearFilter = new Date (filteredByMassMeteors[0].year).getFullYear().toString();
                 state.showNotification = true;
             }
        }
    },
    resetByYearFilter:(state:MeteorState) => {
        state.byYearFilter = '';
    },
    resetByMassFilter:(state:MeteorState) => {
          state.byMassFilter = '';
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMeteorAsync.pending, (state) => {
        state.status = LOADING;
      });
      builder.addCase(fetchMeteorAsync.fulfilled,
      (state, action) => {
          state.meteors = action.payload;
          state.status = SUCCESS;
      });
      builder.addCase(fetchMeteorAsync.rejected, (state) => {
        state.status = FAILED;
        state.meteors = [];
    });
  },
});

export const { updateByYearFilter, updateByMassFilter,calculateFilter, resetByYearFilter, resetByMassFilter } = meteorSlice.actions;

export const selectMeteors = (state: RootState) => state.meteor.meteors;

export const selectFilteredMeteorsByYear = (meteorState: MeteorState) => {
  return meteorState.meteors.filter(meteor => new Date(meteor.year).getFullYear().toString() === meteorState.byYearFilter);
}

export const selectFilteredMeteorsByMass = (meteorState: MeteorState) => {
    return meteorState.meteors.filter(meteor => Number(meteor.mass) > Number(meteorState.byMassFilter));

}

export const selectFilteredMeteorsByYearAndMass = (meteorState: MeteorState) => {
    return meteorState.meteors.filter(meteor =>   new Date(meteor.year).getFullYear().toString() ===  meteorState.byYearFilter && Number(meteor.mass) > Number(meteorState.byMassFilter));
}

export  const selectFilteredMeteors = () =>
createSelector(
(state:RootState) => state.meteor,
(meteor:MeteorState) => {
    const year = meteor.byYearFilter;
    const mass = meteor.byMassFilter;
    if(year && !mass) {
        return selectFilteredMeteorsByYear(meteor);
    }
    if(year && mass) {
        return selectFilteredMeteorsByYearAndMass(meteor);
    }
    if(!year && mass) {
        return selectFilteredMeteorsByMass(meteor);
    }
    return meteor.meteors;
});

export  const selectUpdateYearFilter = () =>
createSelector(
(state:RootState) => state.meteor,
(meteor:MeteorState) => {
    const year = meteor.byYearFilter;
    const mass = meteor.byMassFilter;
    if(year && mass ){
        const filteredMeteorsByYearAndMass = selectFilteredMeteorsByYearAndMass(meteor);
        if(!filteredMeteorsByYearAndMass.length) {
            const filteredMeteorsByMass = selectFilteredMeteorsByMass(meteor);
            if(filteredMeteorsByMass.length) {
                return new Date(filteredMeteorsByMass[0].year).getFullYear().toString();
            }
        }
    }
    return '';

});

export default meteorSlice.reducer;
