import {LinearProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const characterNumber = 91;

function entropyCalc(str: string): number {
    const len: number = str.length;

    const frequencies: { [key: string]: number } = Array.from(str).reduce(
        (freq, c) => {
            freq[c] = (freq[c] || 0) + 1;
            return freq;
        },
        {} as { [key: string]: number }
    );

    return Object.values(frequencies).reduce(
        (sum, f) => sum - (f / len) * Math.log2(f / len),
        0
    );
}

const calculatePasswordEntropy = (password: string) => {
    const entropy = entropyCalc(password);
    console.log('Entropy:', entropy);

    // Normalize entropy to a percentage between 0 and 100
    return Math.min((entropy / 4.321928094887363) * 100, 100);
}

const calculatePasswordStrength = (password: string) => {
    const entropy = password.length * Math.log2(characterNumber);

    return Math.min((entropy / 120) * 100, 100);
};

const getPasswordStrengthText = (password: string, passwordStrength: number) => {
    const digitRegex = /\d/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[\%\!\@\#\&\(\)\–\_\+\=\[\{\}\]\:\;\'\,\.\?\/\*\~\`\$\^\<\>]/g;

    const hasDigit = digitRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    const isLongEnough = password.length >= 7;

    let passwordStrengthText = 'Password strength: ';


    if (passwordStrength < 33) {
        passwordStrengthText = passwordStrengthText.concat("Weak");
    } else if (passwordStrength < 66) {
        passwordStrengthText = passwordStrengthText.concat('Medium');
    } else {
        passwordStrengthText = passwordStrengthText.concat('Strong');
    }

    if (!(hasDigit && hasLowercase && hasUppercase && hasSpecialChar && isLongEnough)) {
        passwordStrengthText = passwordStrengthText.concat(' and does not meet the minimum requirements.');
    } else {
        passwordStrengthText = passwordStrengthText.concat('.');
    }

    return passwordStrengthText;
}

const getPasswordStrengthColor = (passwordStrength: number) => {
    if (passwordStrength < 33) {
        return 'error';
    } else if (passwordStrength < 66) {
        return 'warning';
    } else {
        return 'success';
    }
}

const getPasswordStrengthTextColor = (passwordStrength: number) => {
    if (passwordStrength < 33) {
        return '#f44336';
    } else if (passwordStrength < 66) {
        return '#ff9800';
    } else {
        return '#4caf50';
    }
}

const PasswordStrengthMeter = ({password}: { password: string }) => {
    const passwordStrength = calculatePasswordStrength(password);
    let passwordStrengthText = getPasswordStrengthText(password, passwordStrength);
    let passwordStrengthColor = getPasswordStrengthColor(passwordStrength);
    let passwordStrengthTextColor = getPasswordStrengthTextColor(passwordStrength);

    return (
        <Container>
            <LinearProgress variant="determinate" value={passwordStrength} aria-valuemax={100} color={passwordStrengthColor as 'error' | 'warning' | 'success'}/>
            <Typography variant="body2" color={passwordStrengthTextColor}>
                {passwordStrengthText}
            </Typography>
        </Container>
    );
};

export default PasswordStrengthMeter;