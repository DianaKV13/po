import { User } from './User.js';

const drawTableRows = (users) => {
    const tableBody = document.querySelector('#users-table-body');
    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="editable" data-field="firstName">${user.firstName}</td>
            <td class="editable" data-field="lastName">${user.lastName}</td>
            <td>${user.email}</td>  <!-- Email is not editable -->
            <td class="editable" data-field="password">${user.password}</td>
            <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
        `;

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'התנתקות';
        logoutBtn.addEventListener('click', () => {
            User.logout(user.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'מחיקה';
        deleteBtn.addEventListener('click', () => {
            User.removeUser(user.id);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'עריכה';
        editButton.addEventListener('click', () => {
            enableEditing(row, user);
        });

        row.appendChild(logoutBtn);
        row.appendChild(deleteBtn);
        row.appendChild(editButton);

        tableBody.appendChild(row);
    });
};

const enableEditing = (row, user) => {
    const editableCells = row.querySelectorAll('.editable');
    
    editableCells.forEach((cell) => {
        const field = cell.getAttribute('data-field');
        const currentValue = cell.textContent;

        const input = document.createElement('input');
        input.value = currentValue;
        cell.innerHTML = '';
        cell.appendChild(input);
    });

    const editButton = row.querySelector('button');
    editButton.textContent = 'שמור';
    editButton.addEventListener('click', () => {
        user.firstName = row.querySelector('[data-field="firstName"] input').value;
        user.lastName = row.querySelector('[data-field="lastName"] input').value;
        user.password = row.querySelector('[data-field="password"] input').value;

        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    });
};

const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        alert('הדוא"ל חייב להיות עם סיומת @gmail.com');
        return;
    }

    if (!passwordRegex.test(password)) {
        alert('הסיסמא צריכה להיות לפחות 6 תווים ולהכיל גם אותיות וגם מספרים');
        return;
    }

    const users = User.usersList;

    if (users.find((user) => user.email === email)) {
        alert('משתמש עם כתובת דוא"ל זו כבר קיים');
        return;
    }

    new User(firstName, lastName, email, password);
    e.target.reset();
});


const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const user = User.usersList.find((user) => user.email === email);
    if (user && user.password === password) {
        User.login(user.id);
        e.target.reset();
    } else {
        alert('שם משתמש או סיסמה לא נכונים');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const storedUsers = localStorage.getItem('users');
    
    if (storedUsers) {
        User.usersList = JSON.parse(storedUsers);
    }

    drawTableRows(User.usersList);
});

export { drawTableRows, registerForm, loginForm };
