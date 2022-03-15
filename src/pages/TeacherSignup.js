import { TeacherSignupForm } from '../components/SignupForms/TeacherSignupForm';
import { PublicNavBar } from '../components/NavigationBar/PublicNavBar';
import Container from '@mui/material/Container';
import { Paper } from '@material-ui/core';
import logo from '../assets/img/logo.png';

const styles = {
	paperContainer: {
		margin: '2rem 0',
		borderRadius: '25px',
	},
};

export const TeacherSignup = () => {
	return (
		<Container>
			<PublicNavBar />
			<Container component='main' maxWidth='md'>
				<Paper elevation={6} style={styles.paperContainer}>
					<div className='logoContainer'>
						<img src={logo} className='logo' />
					</div>
					<TeacherSignupForm />
				</Paper>
			</Container>
		</Container>
	);
};
