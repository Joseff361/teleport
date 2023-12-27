import FormHeader from '../../atoms/FormHeader/FormHeader';
import SignInForm from '../../organisms/SignInForm/SignInForm';

function SignInPage() {
  return (
    <div>
      <FormHeader title="Welcome back!" subtitle="Please enter your details" />
      <SignInForm />
    </div>
  );
}

export default SignInPage;
