import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import UserService from '../../services/UserService';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  members: [],
  isOpenModal: false,
  selectedMemberId: null,
};

const slice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MEMBERS
    getMembersSuccess(state, action) {
      state.isLoading = false;
      state.members = action.payload;
    },

    // CREATE MEMBER
    createMemberSuccess(state, action) {
      const newMember = action.payload;
      state.isLoading = false;
      state.members = [...state.members, newMember];
    },

    // UPDATE MEMBER
    updateMemberSuccess(state, action) {
      const member = action.payload;
      const updateMember = state.members.map((_member) => {
        if (_member.id === member.id) {
          return member;
        }
        return _member;
      });

      state.isLoading = false;
      state.members = updateMember;
    },

    // DELETE MEMBER
    deleteMemberSuccess(state, action) {
      const { memberId } = action.payload;
      const deleteMember = state.members.filter((member) => member.id !== memberId);
      state.members = deleteMember;
    },

    // SELECT MEMBER
    selectMember(state, action) {
      const memberId = action.payload;
      state.isOpenModal = true;
      state.selectedMemberId = memberId;
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedMemberId = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectMember } = slice.actions;

// ----------------------------------------------------------------------

export function getMembers() {
  return async () => {
    console.log("Getting members")
    dispatch(slice.actions.startLoading());
    try {
      const resp = await UserService.getCompanyMembers();
      if (resp.success) {
        const users = resp.data[0]?.users;
        console.log('users', users);
        dispatch(slice.actions.getMembersSuccess(users));
      } else {
        dispatch(slice.actions.hasError(resp.error));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createMember(newMember) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/members/new', newMember);
      dispatch(slice.actions.createMemberSuccess(response.data.member));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateMember(memberId, updateMember) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/members/update', {
        memberId,
        updateMember,
      });
      dispatch(slice.actions.updateMemberSuccess(response.data.member));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteMember(memberId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/members/delete', { memberId });
      dispatch(slice.actions.deleteMemberSuccess({ memberId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}