import { TeacherSignupForm } from '../components/SignupForms/TeacherSignupForm';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import logo from '../assets/img/logo.png';
import { Logo } from '../components/Logo';

const styles = {
	paperContainer: {
		margin: '2rem 0',
		borderRadius: '25px',
	},
};

export const TeacherSignup = () => {
	return (
		<Container>
			<Container component='main' maxWidth='md'>
				<Paper elevation={6} style={styles.paperContainer}>
					<Logo />
					<TeacherSignupForm />
				</Paper>
			</Container>
		</Container>
	);
};
