import FormHeader from '../../atoms/FormHeader/FormHeader';
import SignUpForm from '../../organisms/SignUpForm/SignUpForm';

function SignUpPage() {
  return (
    <div>
      <FormHeader title="Sign up" subtitle="Create your account" />
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
