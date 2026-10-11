# Employee Management System (EMS)

A web-based **Employee Management System** built with **HTML, CSS, and
JavaScript**. It provides an administrative dashboard for viewing
employee information, monitoring attendance, reviewing leave requests,
and managing basic system preferences through a clean, card-based
interface.

## 📌 Project Overview

The EMS project demonstrates front-end web development concepts such as
responsive layouts, DOM manipulation, event handling, dynamic table
rendering, modal forms, status indicators, browser-based state, and
dashboard KPI calculations.

## ✨ Features

-   **Dashboard**
    -   Summary cards for employee count, attendance, pending leave
        requests, and salary expense.
    -   Weekly attendance visualization and department distribution.
    -   Recent employee and leave-request tables.
    -   Current date/time display and a notification panel.
-   **Employee Management**
    -   View employee records with employee ID, department, email,
        phone, joining date, and status.
    -   Search employees by name, department, or ID.
    -   Add, edit, and delete employee records through the interface.
-   **Attendance**
    -   Attendance summary cards and attendance records table.
    -   Date-filter control in the attendance section.
-   **Leave Requests**
    -   View leave applications and their status.
    -   Filter requests by All, Pending, Approved, and Denied.
    -   Approve or deny pending requests.
-   **Settings**
    -   Configure company name, working hours, weekly off, and
        light/dark theme.
-   **User Interface**
    -   Sidebar navigation, KPI cards, tables, status badges, modal
        dialogs, toast messages, and responsive layout adjustments.

> **Note:** This is a front-end demonstration project. The employee,
> attendance, leave, salary, and notification information is sample data
> defined in JavaScript. The project does not currently connect to a
> server or database. Most changes are held in browser memory and may
> reset when the page is reloaded. The current navigation page is stored
> in `localStorage`; this does not mean that all application records are
> permanently saved.

## 🛠️ Technologies Used

-   **HTML5** --- page structure and content
-   **CSS3** --- layout, styling, responsive adjustments, and light/dark
    theme styles
-   **JavaScript (Vanilla)** --- application logic, dynamic rendering,
    calculations, filtering, and interactions
-   **Font Awesome** --- icons
-   **Google Fonts (Inter)** --- typography

## 📁 Project Structure

``` text
Employee-Management-System/
├── index.html       # Main HTML structure and application views
├── style.css        # Styling, layout, and theme rules
├── script.js        # Sample data, dashboard logic, and interactions
├── bg_img.png       # Dashboard background image
└── README.md        # Project documentation
```

Keep `index.html`, `style.css`, `script.js`, and `bg_img.png` in the
same project folder so the linked stylesheet, script, and background
image can be loaded correctly.

## 🚀 How to Run

1.  Download or clone this repository.
2.  Make sure all four project files are in the same folder.
3.  Open `index.html` in a modern web browser.
4.  Use the sidebar to navigate between Dashboard, Employees,
    Attendance, Leave Requests, and Settings.

No package installation or build step is required for the current
front-end version. An internet connection may be needed to load the
externally hosted Font Awesome icons and Google Font.

## 🧭 Using the Application

-   **Dashboard:** review the sample workforce summary, department
    distribution, attendance overview, and recent records.
-   **Employees:** search the employee list and use the available
    employee-management actions.
-   **Attendance:** view attendance records and try the date control.
-   **Leave Requests:** use the status tabs to filter applications and
    process pending requests.
-   **Settings:** change the available settings and switch between light
    and dark themes.

The supplied records are illustrative demo data, not live employee
information.

## ⚠️ Current Limitations

-   There is no backend, authentication system, or database integration.
-   Sample records are defined in `script.js`.
-   Most record changes are not persisted after a page reload.
-   The attendance date control currently displays a filtering
    notification; it should not be treated as a fully implemented
    date-based query.
-   The dashboard and management screens are intended as a front-end
    project/demo, not as a production HR system.

## 🔮 Possible Future Improvements

-   Connect the interface to a backend and database.
-   Add secure login, roles, and access permissions.
-   Persist employee, attendance, leave, and settings data.
-   Implement complete date-wise attendance filtering and reporting.
-   Add form validation, export options, and automated tests.

## 👨‍💻 Author

**Abhay Dwivedi**

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Made with ❤️ by Abhay Dwivedi
```{=html}
</p>
```
