function generatePassword(length: number): string {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let password = '';

    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    const characters = lowerCase + upperCase + numbers + symbols;

    for (let i = password.length; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    password = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    return password;
}

export default generatePassword;
