import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// redux
import { useDispatch } from '../../../redux/store';
import { createMember, updateMember, deleteMember } from '../../../redux/slices/team';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFSelect, RHFTextField, RHFSwitch } from '../../../components/hook-form';

// ----------------------------------------------------------------------
const roles = [
  'MEMBER',
  'ADMIN'
]
const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (member, range) => {
  const _member = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (member) {
    return merge({}, _member, member);
  }

  return _member;
};

// ----------------------------------------------------------------------

InviteMemberForm.propTypes = {
  member: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function InviteMemberForm({ member, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const isCreating = Object.keys(member).length === 0;

  const MemberSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(MemberSchema),
    defaultValues: getInitialValues(member),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const newMember = {
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      if (member._id) {
        dispatch(updateMember(member._id, newMember));
        enqueueSnackbar('Update success!');
      } else {
        enqueueSnackbar('Create success!');
        dispatch(createMember(newMember));
      }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!member._id) return;
    try {
      onCancel();
      dispatch(deleteMember(member._id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="userInfo.display_name" label="Name" disabled />

        <RHFTextField name="userInfo.email" label="Email" disabled />

        <RHFSelect name="role" label="Role" placeholder="Select Role">
          <option value="" />
          {roles.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect>

      </Stack>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Member">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {isCreating ? "Add" : "Update"}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
