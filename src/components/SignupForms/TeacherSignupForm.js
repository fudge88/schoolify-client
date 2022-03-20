import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { GET_YEAR_GROUP_DATA } from '../../graphql/query';
import { TEACHER_SIGN_UP } from '../../graphql/mutations';
import { forms } from '../../styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorIcon from '@mui/icons-material/Error';

import { item, colors, headers } from '../../styles';

const titleOptions = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];

export const TeacherSignupForm = () => {
	const {
		loading: queryLoading,
		error: queryError,
		data: queryData,
	} = useQuery(GET_YEAR_GROUP_DATA);

	const [executeSignUp, { loading, error }] = useMutation(TEACHER_SIGN_UP);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = async (formData) => {
		if (formData.password !== formData.confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: 'Passwords do not match',
			});
		} else {
			const { data } = await executeSignUp({
				variables: {
					input: {
						title: formData.title,
						password: formData.password,
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.emailAddress,
						yearGroup: formData.yearGroup,
					},
				},
			});

			if (data?.teacherSignUp) {
				navigate('/login', { replace: true });
			}
		}
	};

	if (error) {
		return <div>ERROR</div>;
	}

	return (
		<Grid
			container
			sx={item.outerContainer}
			component='form'
			onSubmit={handleSubmit(onSubmit)}>
			<Grid item xs={12}>
				<Typography
					variant='h5'
					gutterBottom
					component='div'
					sx={{ textAlign: 'center' }}>
					Teacher . Signup . Page
				</Typography>
			</Grid>
			<Grid item xs={12} md={6}>
				<Box sx={colors.yellow}>
					<Typography
						color='warning.dark'
						variant='subtitle1'
						component='div'
						sx={{ padding: '0px 8px' }}>
						Enter personal details
					</Typography>
					<FormControl sx={{ mt: 2 }} fullWidth>
						<InputLabel id='yearGroup' color='warning'>
							Year Group
						</InputLabel>
						<Controller
							control={control}
							name='yearGroup'
							render={({ field: { onChange, value } }) => (
								<Select
									color='warning'
									labelId='yearGroup'
									id='yearGroup'
									value={value || ''}
									onChange={onChange}
									label='Year Group'
									disabled={loading}
									error={!!errors.yearGroup}
									{...register('yearGroup', { required: true })}>
									{queryData?.yearGroups?.map((yearGroupObj, index) => {
										return (
											<MenuItem key={index} value={yearGroupObj.id}>
												{yearGroupObj.title}
											</MenuItem>
										);
									})}
								</Select>
							)}
						/>
					</FormControl>
					<FormControl sx={{ mt: 2 }} fullWidth>
						<InputLabel id='title' color='warning'>
							Title
						</InputLabel>
						<Select
							color='warning'
							labelId='title'
							id='title'
							label='Title'
							{...register('title')}
							defaultValue='Mr'
							autoFocus
							disabled={loading}>
							{titleOptions.map((title, index) => (
								<MenuItem key={index} value={title}>
									{title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						color='warning'
						margin='normal'
						id='firstName'
						label='First Name'
						variant='outlined'
						name='firstName'
						fullWidth
						disabled={loading}
						{...register('firstName', { required: true })}
						error={!!errors.firstName}
					/>
					<TextField
						color='warning'
						margin='normal'
						id='lastName'
						label='Last Name'
						variant='outlined'
						name='lastName'
						fullWidth
						disabled={loading}
						{...register('lastName', { required: true })}
						error={!!errors.lastName}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} md={6}>
				<Box sx={colors.purple}>
					<Typography
						color='secondary.dark'
						variant='subtitle1'
						component='div'
						sx={{ padding: '0px 8px' }}>
						Enter login details
					</Typography>
					<TextField
						color='secondary'
						margin='normal'
						id='emailAddress'
						label='Email Address'
						variant='outlined'
						name='emailAddress'
						fullWidth
						disabled={loading}
						{...register('emailAddress', {
							required: true,
							pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
						})}
						error={!!errors.emailAddress}
					/>
					<TextField
						color='secondary'
						margin='normal'
						id='password'
						label='Password'
						variant='outlined'
						name='password'
						type='password'
						fullWidth
						disabled={loading}
						{...register('password', {
							required: true,
							pattern:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
						})}
						error={!!errors.password}
					/>
					<Typography
						variant='caption'
						component='div'
						sx={{ padding: '0px 8px' }}>
						Password must be 8 characters, and include both lowercase and
						uppercase characters, with 1 special character required
					</Typography>
					<TextField
						color='secondary'
						margin='normal'
						id='confirmPassword'
						label='Confirm Password'
						variant='outlined'
						name='confirmPassword'
						type='password'
						fullWidth
						disabled={loading}
						{...register('confirmPassword', { required: true })}
						error={!!errors.confirmPassword}
					/>
					{errors?.confirmPassword?.message && (
						<Typography
							variant='caption'
							component='div'
							sx={{ padding: '0px 8px', color: '#d32f2f' }}>
							{errors?.confirmPassword?.message}
						</Typography>
					)}
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box sx={item.inputBox}>
					<LoadingButton
						loading={loading}
						disabled={loading}
						fullWidth
						type='submit'
						variant='contained'
						sx={item.actionButtons}
						startIcon={error && <ErrorIcon />}
						color={error ? 'error' : 'secondary'}>
						Sign Up
					</LoadingButton>
					<Link
						component={RouterLink}
						variant='body2'
						to='/login'
						underline='none'>
						Already have an account? Login
					</Link>
					{!!error && (
						<Typography
							variant='subtitle2'
							gutterBottom
							component='div'
							sx={forms.errorContainer}>
							Failed to sign up, please try again.
						</Typography>
					)}
				</Box>
			</Grid>
		</Grid>
	);
};
