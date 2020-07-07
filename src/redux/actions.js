export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';

export const updateProfile = update => ({
  type: UPDATE_PROFILE,
  payload: update,
})

export const deleteProfile = () => ({
  type: DELETE_PROFILE,
})
