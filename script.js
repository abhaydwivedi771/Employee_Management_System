
// ---------- DATA STORE ----------
const dashboardData = {
    employees: [
        { id: 2073, name: "Akash Sharma", department: "Marketing", email: "akash@gmail.com", phone: "+91 9123456781", status: "present", joinDate: "15-03-2025" },
        { id: 3013, name: "Sumit Yadav", department: "HR", email: "sumit@gmail.com", phone: "+91 9345678102", status: "absent", joinDate: "20-01-2025" },
        { id: 3017, name: "Aditya Singh", department: "Sales", email: "aditya@gmail.com", phone: "+91 9876543210", status: "present", joinDate: "10-01-2025" },
        { id: 3009, name: "Priya Verma", department: "HR", email: "priya@gmail.com", phone: "+91 9012345678", status: "present", joinDate: "05-02-2025" },
        { id: 4021, name: "Karan Tiwari", department: "Engineering", email: "karan@gmail.com", phone: "+91 9765432109", status: "present", joinDate: "28-02-2025" },
        { id: 4022, name: "Vivek Chauhan", department: "HR", email: "vivek@gmail.com", phone: "+91 9456789012", status: "present", joinDate: "20-03-2025" },
        { id: 4023, name: "Neha Gupta", department: "Marketing", email: "neha@gmail.com", phone: "+91 9234567819", status: "present", joinDate: "25-03-2025" },
        { id: 4024, name: "Aarav Sharma", department: "Sales", email: "aarav@gmail.com", phone: "+91 9567812340", status: "absent", joinDate: "10-04-2025" },
        { id: 5025, name: "Ishita Roy", department: "Engineering", email: "ishita@gmail.com", phone: "+91 9890123456", status: "present", joinDate: "22-04-2025" },
        { id: 5026, name: "Alok Tiwari", department: "HR", email: "alok@gmail.com", phone: "+91 9789012345", status: "present", joinDate: "10-05-2025" }
    ],
    leaveRequests: [
        { employee: "Sumit Yadav", date: "May 02, 2025", reason: "Illness", status: "pending", days: 2 },
        { employee: "Karan Tiwari", date: "May 04, 2025", reason: "Vacation", status: "pending", days: 5 },
        { employee: "Neha Gupta", date: "May 05, 2025", reason: "Wedding", status: "pending", days: 3 },
    ],
    attendance: {
        weekly: [0, 0, 0, 0, 0, 0, 0],
        byDepartment: { hr: 0, engineering: 0, sales: 0, marketing: 0 },
        presentToday: 0,
        totalEmployees: 0,
        absentToday: 0,
        records: [
            { employee: "Akash Sharma", date: "May 20", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "present" },
            { employee: "Sumit Yadav", date: "May 20", checkIn: "--", checkOut: "--", status: "absent" },
            { employee: "Aditya Singh", date: "May 20", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "present" },
            { employee: "Priya Verma", date: "May 20", checkIn: "10:30 AM", checkOut: "04:00 PM", status: "present" },
            { employee: "Karan Tiwari", date: "May 20", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "present" },
            { employee: "Vivek Chauhan", date: "May 20", checkIn: "--", checkOut: "--", status: "absent" },
            { employee: "Neha Gupta", date: "May 20", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "present" },
            { employee: "Aarav Sharma", date: "May 20", checkIn: "10:30 AM", checkOut: "04:00 PM", status: "present" },
            { employee: "Ishita Roy", date: "May 20", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "present" },
            { employee: "Alok Tiwari", date: "May 20", checkIn: "--", checkOut: "--", status: "absent" }
            
        ]
    },
    salary: {
        total: 400000,
        byDepartment: { hr: 100000, engineering: 100000, sales: 100000, marketing: 100000 }
    },
    departments: {
        hr: 0,
        engineering: 0,
        sales: 0,
        marketing: 0
    },
    endingLeaves: 7,
    settings: {
        companyName: "EMS Corporation",
        theme: "light",
        workingHours: "9:00 AM - 5:00 PM",
        weekOff: "Saturday, Sunday"
    },
    notifications: [
        { id: 1, message: "Sumit Yadav requested sick leave", time: "5 min ago", read: false, type: "leave" },
        { id: 2, message: "New employee joined: Alok Tiwari", time: "1 hour ago", read: false, type: "employee" }
    ]
};

// This tool counts employees and updates the stats
function recalculateKPIs() {
    const employees = dashboardData.employees;
    const total = employees.length || 1;
    const now = new Date();

    // 1. Basic Stats
    const present = employees.filter(e => e.status === 'present').length;
    const absent = employees.filter(e => e.status === 'absent').length;
    const rate = ((present / total) * 100).toFixed(1);

    // Date Helper for DD-MM-YYYY format
    const parseMyDate = (str) => {
        const p = str.split('-');
        return new Date(p[2], p[1]-1, p[0]);
    };

    const joinedThisMonth = employees.filter(emp => {
        const joinDate = parseMyDate(emp.joinDate);
        return joinDate.getMonth() === now.getMonth() && 
               joinDate.getFullYear() === now.getFullYear();
    }).length;

    dashboardData.attendance.totalEmployees = total;
    dashboardData.attendance.presentToday = present;
    dashboardData.attendance.absentToday = absent;
    dashboardData.attendance.rate = rate;
    dashboardData.attendance.joinedThisMonth = joinedThisMonth;

    const deptAttendance = {}; // Counts only PRESENT employees
    const deptHeadcount = {};  // Counts TOTAL employees for distribution

    employees.forEach(emp => {
        const dept = emp.department;
        // Total headcount per dept
        deptHeadcount[dept] = (deptHeadcount[dept] || 0) + 1;
        
        // Attendance count per dept (Only if present)
        if (!deptAttendance[dept]) deptAttendance[dept] = 0;
        if (emp.status === 'present') {
            deptAttendance[dept]++;
        }
    });

    dashboardData.attendance.byDepartment = deptAttendance;

    // Calculate Distribution Percentages
    dashboardData.departments = {};
    for (let dept in deptHeadcount) {
        dashboardData.departments[dept] = ((deptHeadcount[dept] / total) * 100).toFixed(1);
    }

    // 3. Update Weekly Chart
    const today = new Date().getDay(); 
    const barIndex = (today + 6) % 7; 
    dashboardData.attendance.weekly[barIndex] = present;
}


// ---------- UTILITY FUNCTIONS ----------
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// ---------- TIME AND DATE UPDATE ----------
class TimeManager {
    constructor() {
        this.updateInterval = null;
    }

    start() {
        this.updateDateTime();
        this.updateInterval = setInterval(() => this.updateDateTime(), 1000);
    }

    updateDateTime() {
        const now = new Date();
        const mainBadge = document.getElementById('mainDateBadge');
        
        if (mainBadge) {
            mainBadge.innerHTML = `<i class="far fa-calendar-alt"></i> ${formatDate(now)}`;
        }

        let timeBadge = document.getElementById('timeBadge');
        if (!timeBadge) {
            const headerActions = document.querySelector('.header-actions');
            if(headerActions) {
                timeBadge = document.createElement('span');
                timeBadge.className = 'date-badge time-badge';
                timeBadge.id = 'timeBadge';
                headerActions.insertBefore(timeBadge, document.getElementById('notificationBell'));
            }
        }
        
        if (timeBadge) {
            timeBadge.innerHTML = `<i class="far fa-clock"></i> ${formatTime(now)}`;
        }
    }

    updateTimeDisplay() {
        const timeBadge = document.getElementById('timeBadge');
        if (timeBadge) {
            const now = new Date();
            timeBadge.innerHTML = `<i class="far fa-clock"></i> ${formatTime(now)}`;
        }
    }

    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// ---------- NOTIFICATION SYSTEM ----------
class NotificationManager {
    constructor() {
        this.notifications = dashboardData.notifications;
        this.init();
    }

    init() {
        this.setupNotificationBell();
        this.updateNotificationCount();
    }

    
    setupNotificationBell() {
        const bellBadge = document.getElementById('notificationBell') || 
                          document.querySelector('.header-actions .date-badge:last-child');
    
        if (bellBadge) {
            bellBadge.style.cursor = 'pointer';
            bellBadge.style.position = 'relative';
            bellBadge.id = 'notificationBell'; // Ensure ID exists

            bellBadge.onclick = (e) => {
                e.stopPropagation();
                this.toggleNotificationPanel();
            };
    
            this.updateNotificationCount();
        }
    }

    updateNotificationCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const bell = document.getElementById('notificationBell');

        if (bell) {
            bell.innerHTML = '<i class="far fa-bell"></i>';

            if (unreadCount > 0) {
                const badge = document.createElement('span');
                badge.className = 'notification-count';
                badge.textContent = unreadCount;
                badge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 700;
                    animation: pulse 2s infinite;
                `;
                bell.appendChild(badge);
            }
        }
    }

    toggleNotificationPanel() {
        const existingPanel = document.getElementById('notificationPanel');

        if (existingPanel) {
            existingPanel.remove();
            return;
        }

        this.showNotificationPanel();
    }

    showNotificationPanel() {
        const panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'notification-panel';

        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="mark-all-read" id="markAllRead">Mark all as read</button>
            </div>
            <div class="notification-list">
                ${this.notifications.length > 0 ?
                this.notifications.map(notif => `
                        <div class="notification-item ${notif.read ? 'read' : 'unread'}" data-id="${notif.id}">
                            <div class="notification-icon">
                                <i class="fas fa-${notif.type === 'leave' ? 'calendar-check' :
                            notif.type === 'employee' ? 'user-plus' :
                            notif.type === 'payroll' ? 'dollar-sign' : 'bell'}"></i>
                            </div>
                            <div class="notification-content">
                                <p>${notif.message}</p>
                                <span>${notif.time}</span>
                            </div>
                            ${!notif.read ? '<div class="unread-dot"></div>' : ''}
                        </div>
                    `).join('') :
                '<p class="no-notifications">No notifications</p>'
            }
            </div>
        `;

        document.body.appendChild(panel);

        // Add event listeners
        document.getElementById('markAllRead').addEventListener('click', () => {
            this.markAllAsRead();
            panel.remove();
        });

        panel.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.markAsRead(id);
                item.classList.add('read');
                const unreadDot = item.querySelector('.unread-dot');
                if (unreadDot) unreadDot.remove();
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && e.target.id !== 'notificationBell') {
                panel.remove();
            }
        }, { once: true });
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.updateNotificationCount();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateNotificationCount();
        this.showToast('All notifications marked as read', 'success');
    }

    addNotification(message, type = 'info') {
        const newNotification = {
            id: Date.now(),
            message: message,
            time: 'Just now',
            read: false,
            type: type
        };
        this.notifications.unshift(newNotification);
        this.updateNotificationCount();
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ---------- PAGE CONTENT RENDERER ----------
class PageRenderer {
    renderPage(pageName) {
        localStorage.setItem('currentPage', pageName);

        switch (pageName) {
            case 'dashboard': this.renderDashboard(); break;
            case 'employees': this.renderEmployeesPage(); break;
            case 'attendance': this.renderAttendancePage(); break;
            case 'leave-requests':
            case 'leaverequests': this.renderLeaveRequestsPage(); break;
            case 'settings': this.renderSettingsPage(); break;
            default: this.renderDashboard();
        }
    }

    renderDashboard() {
        // 1. Calculate dynamic pending leaves count
        const pendingLeaves = dashboardData.leaveRequests.filter(r => r.status === 'pending');
    
        document.getElementById('dash-total-emp').textContent = dashboardData.attendance.totalEmployees;
        document.getElementById('dash-joined-month').textContent = `↗︎ +${dashboardData.attendance.joinedThisMonth} this month`;
        document.getElementById('dash-present').textContent = dashboardData.attendance.presentToday;
        document.getElementById('dash-rate').textContent = `${dashboardData.attendance.rate}% attendance`;
        
        document.getElementById('dash-leaves').textContent = pendingLeaves.length;
        
        document.getElementById('dash-salary').textContent = `₹${dashboardData.salary.total.toLocaleString('en-IN')}`;
    
        document.getElementById('dash-bars').innerHTML = dashboardData.attendance.weekly.map((val, i) => `
            <div class="bar-item">
                <div class="bar" style="--h: ${(val / (dashboardData.attendance.totalEmployees || 1)) * 80}px; ${i >= 5 ? 'background: #cbd5e1;' : ''}"></div>
                <span class="bar-label">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
            </div>
        `).join('');
    
        document.getElementById('dash-dept-attendance').innerHTML = Object.entries(dashboardData.attendance.byDepartment).map(([dept, count]) => {
            const icons = { 'HR': 'user-tie', 'Engineering': 'code', 'Sales': 'chart-line', 'Marketing': 'bullhorn' };
            const icon = icons[dept] || 'building';
            return `<span><i class="fas fa-${icon}"></i> ${dept}: ${count}</span>`;
        }).join('') + `<span style="color:#b45353;"><i class="fas fa-user-slash"></i> Absent: ${dashboardData.attendance.absentToday}</span>`;
    
        document.getElementById('dash-dept-dist').innerHTML = Object.entries(dashboardData.departments).map(([dept, percent]) => `
            <div>
                <div class="dept-row" style="margin-top: 12px;">
                    <span class="dept-name">${dept.toUpperCase()}</span>
                    <span class="dept-percent">${percent}%</span>
                </div>
                <div class="progress-bg"><div class="progress-fill" style="--w: ${percent}%"></div></div>
            </div>
        `).join('');
    
        document.getElementById('dash-recent-emp-tbody').innerHTML = dashboardData.employees.slice(0, 4).map(emp => `
            <tr>
                <td>${emp.name}</td><td>${emp.id}</td><td>${emp.department}</td>
                <td><span class="status-badge ${emp.status}">${emp.status}</span></td>
            </tr>
        `).join('');
    
        const pendingTableRows = pendingLeaves.slice(0, 3).map(req => `
            <tr>
                <td>${req.employee}</td>
                <td>${req.date}</td>
                <td>${req.reason}</td>
                <td>
                    <span class="action-btn approve" style="cursor:pointer;" onclick="window.app.approveLeave('${req.employee}')">Approve</span>
                    <span class="action-btn deny" style="background:#fee2e2; color:#991b1b; cursor:pointer;" onclick="window.app.handleLeave('${req.employee}', 'deny')">Deny</span>
                </td>
            </tr>
        `).join('');
    
        document.getElementById('dash-recent-leave-tbody').innerHTML = pendingTableRows || `<tr><td colspan="4" style="text-align:center; color:#94a3b8; padding: 15px;">No pending leave requests</td></tr>`;
    }

    renderEmployeesPage() {
        document.getElementById('emp-total').textContent = dashboardData.employees.length;
        document.getElementById('emp-present').textContent = dashboardData.employees.filter(e => e.status === 'present').length;
        document.getElementById('emp-absent').textContent = dashboardData.employees.filter(e => e.status === 'absent').length;

        document.getElementById('employeesTableBody').innerHTML = dashboardData.employees.map(emp => `
            <tr>
                <td>
                    <div class="employee-info">
                        <div class="avatar-small">${emp.name.split(' ').map(n => n[0]).join('')}</div>
                        <span>${emp.name}</span>
                    </div>
                </td>
                <td>${emp.id}</td>
                <td>${emp.department}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.joinDate}</td>
                <td><span class="status-badge ${emp.status}">${emp.status}</span></td>
                <td>
                    <button class="btn-icon edit-btn" onclick="window.app.editEmployee(${emp.id})" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete-btn" onclick="window.app.deleteEmployee(${emp.id})" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    renderAttendancePage() {
        document.getElementById('att-present').textContent = dashboardData.attendance.presentToday;
        document.getElementById('att-absent').textContent = dashboardData.attendance.absentToday;
        document.getElementById('att-rate').textContent = `${dashboardData.attendance.rate}%`;
        document.getElementById('attendanceDate').value = new Date().toISOString().split('T')[0];

        document.getElementById('attendanceTableBody').innerHTML = dashboardData.attendance.records.map(record => `
            <tr>
                <td>${record.employee}</td>
                <td>${record.date}</td>
                <td>${record.checkIn}</td>
                <td>${record.checkOut}</td>
                <td><span class="status-badge ${record.status}">${record.status}</span></td>
            </tr>
        `).join('');
    }

    renderLeaveRequestsPage() {
        document.getElementById('leave-pending').textContent = dashboardData.leaveRequests.filter(r => r.status === 'pending').length;
        document.getElementById('leave-approved').textContent = dashboardData.leaveRequests.filter(r => r.status === 'approved').length;
        document.getElementById('leave-denied').textContent = dashboardData.leaveRequests.filter(r => r.status === 'denied').length;
        
        window.app.filterLeaves('all'); // Uses existing logic to populate table
    }

    renderSettingsPage() {
        document.getElementById('setCompanyName').value = dashboardData.settings.companyName;
        document.getElementById('setTheme').value = dashboardData.settings.theme;
        document.getElementById('setWorkingHours').value = dashboardData.settings.workingHours;
        document.getElementById('setWeekOff').value = dashboardData.settings.weekOff;
    }
}

// ---------- MAIN APPLICATION ----------
class EMSApplication {
    constructor() {
        this.pageRenderer = new PageRenderer();
        this.currentPage = 'dashboard';
        this.init();
    }

    saveSettings() {
        const newTheme = document.getElementById('setTheme').value;
        const newName = document.getElementById('setCompanyName').value;
        const newHours = document.getElementById('setWorkingHours').value;
        const newWeekOff = document.getElementById('setWeekOff').value;
        
        // Update data store
        dashboardData.settings.theme = newTheme;
        dashboardData.settings.companyName = newName;
        dashboardData.settings.workingHours = newHours;
        dashboardData.settings.weekOff = newWeekOff;
    
        // Apply the theme immediately
        this.applyTheme();
        
        window.notificationManager.showToast('Settings saved successfully!', 'success');
    }
    
    applyTheme() {
        const theme = dashboardData.settings.theme;
        // Remove existing theme classes
        document.body.classList.remove('theme-dark');
        
        // Add the selected theme class
        if (theme !== 'light') {
            document.body.classList.add(`theme-${theme}`);
        }
    }

    init() {
        this.initNavigation();
        this.initLogout();
        this.initGlobalSearch();
        this.applyTheme();

        // 1. Calculate the numbers based on the actual employee list
        recalculateKPIs();

        // 2. Force the dashboard to draw itself immediately
        const lastPage = localStorage.getItem('currentPage') || 'dashboard';
        this.navigateTo(lastPage);

        console.log('🚀 EMS Application initialized');
    }

    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = item.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                this.navigateTo(pageName);
            });
        });
    }

    navigateTo(pageName) {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

        const navItems = document.querySelectorAll('.nav-item');
        let found = false;

        let targetPage = pageName;
        if (pageName === 'leaverequests' || pageName === 'leave-requests') {
            targetPage = 'leave-requests';
        }

        navItems.forEach(item => {
            const itemText = item.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            if (itemText === targetPage || (targetPage === 'leave-requests' && itemText === 'leave-requests')) {
                item.classList.add('active');
                found = true;
            }
        });

        if (!found) {
            navItems[0].classList.add('active');
            targetPage = 'dashboard';
        }

        this.currentPage = targetPage;
        
        // Hide all views, show target view
        document.querySelectorAll('.page-view').forEach(view => {
            view.style.display = 'none';
        });
        
        const activeView = document.getElementById(`${targetPage}-view`);
        if(activeView) {
            activeView.style.display = 'block';
        }

        // Render data into the view
        this.pageRenderer.renderPage(targetPage);
        this.showToast(`Loaded ${targetPage.replace(/-/g, ' ')}`, 'success');
    }


    initLogout() {
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to logout?')) {
                    this.showToast('Logging out...', 'info');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);
                }
            });
        }
    }

    

    initGlobalSearch() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showGlobalSearch();
            }
        });
    }

    showGlobalSearch() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content search-modal">
                <input type="text" id="globalSearchInput" placeholder="Search anything..." autofocus>
                <div id="globalSearchResults"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const input = document.getElementById('globalSearchInput');
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const results = [
                ...dashboardData.employees.filter(emp =>
                    emp.name.toLowerCase().includes(query) ||
                    emp.department.toLowerCase().includes(query)
                ).map(emp => ({ type: 'Employee', name: emp.name, desc: emp.department })),
                ...dashboardData.leaveRequests.filter(req =>
                    req.employee.toLowerCase().includes(query)
                ).map(req => ({ type: 'Leave Request', name: req.employee, desc: req.reason }))
            ];

            const resultsDiv = document.getElementById('globalSearchResults');
            resultsDiv.innerHTML = results.length > 0 ?
                results.map(r => `<div class="search-result-item">${r.type}: ${r.name} - ${r.desc}</div>`).join('') :
                '<p style="padding: 20px; color: #64748b;">No results found</p>';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Employee management functions
    showAddEmployeeDialog() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Add New Employee</h3>
                <input type="text" id="newEmpName" placeholder="Full Name" class="form-input">
                <input type="text" id="newEmpDept" placeholder="Department" class="form-input">
                <input type="email" id="newEmpEmail" placeholder="Email" class="form-input">
                <input type="text" id="newEmpPhone" placeholder="Phone" class="form-input">
                <div class="modal-actions">
                    <button class="btn-primary" onclick="window.app.addEmployee()">Add Employee</button>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

    }


    addEmployee() {
        const name = document.getElementById('newEmpName').value;
        const dept = document.getElementById('newEmpDept').value;
        const email = document.getElementById('newEmpEmail').value;
        const phone = document.getElementById('newEmpPhone').value;

        if (name && dept && email) {
            const newEmp = {
                id: Math.floor(Math.random() * 9000) + 1000,
                name,
                department: dept,
                email,
                phone: phone || 'N/A',
                joinDate: new Date().toISOString().split('T')[0],
                status: 'present'
            };
            dashboardData.employees.push(newEmp);

            recalculateKPIs();

            document.querySelector('.modal-overlay').remove();
            this.pageRenderer.renderPage('employees');
            this.showToast('Employee added successfully!', 'success');
            window.notificationManager.addNotification(`New employee added: ${name}`, 'employee');
        } else {
            this.showToast('Please fill all required fields', 'error');
        }
    }

    editEmployee(id) {
        const emp = dashboardData.employees.find(e => e.id === id);
        if (!emp) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Edit Employee</h3>
                <label>Name</label>
                <input type="text" id="editEmpName" value="${emp.name}" class="form-input">
                <label>Department</label>
                <input type="text" id="editEmpDept" value="${emp.department}" class="form-input">
                <label>Email</label>
                <input type="email" id="editEmpEmail" value="${emp.email}" class="form-input">
                <label>Phone</label>
                <input type="text" id="editEmpPhone" value="${emp.phone}" class="form-input">
                <label>Status</label>
                <select id="editEmpStatus" class="form-input">
                    <option value="present" ${emp.status === 'present' ? 'selected' : ''}>Present</option>
                    <option value="absent" ${emp.status === 'absent' ? 'selected' : ''}>Absent</option>
                    <option value="reject" ${emp.status === 'reject' ? 'selected' : ''}>Reject</option>
                </select>
                <div class="modal-actions">
                    <button class="btn-primary" id="saveEmpBtn">Save Changes</button>
                    <button class="btn-secondary" id="cancelEditBtn">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('saveEmpBtn').addEventListener('click', () => {
            emp.name = document.getElementById('editEmpName').value;
            emp.department = document.getElementById('editEmpDept').value;
            emp.email = document.getElementById('editEmpEmail').value;
            emp.phone = document.getElementById('editEmpPhone').value;
            emp.status = document.getElementById('editEmpStatus').value;

            recalculateKPIs();

            modal.remove();
            this.pageRenderer.renderPage('employees');
            this.showToast('Employee updated successfully!', 'success');
        });

        document.getElementById('cancelEditBtn').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }


    deleteEmployee(id) {
        const emp = dashboardData.employees.find(e => e.id === id);
        if (emp && confirm(`Are you sure you want to delete ${emp.name}?`)) {
            dashboardData.employees = dashboardData.employees.filter(e => e.id !== id);

            recalculateKPIs();

            this.pageRenderer.renderPage('employees');
            this.showToast(`${emp.name} deleted`, 'error');
            window.notificationManager.addNotification(`${emp.name} has been removed`, 'employee');
        }
    }

    filterEmployees(query) {
        const tbody = document.getElementById('employeesTableBody');
        if (!tbody) return;

        const filtered = dashboardData.employees.filter(emp =>
            emp.name.toLowerCase().includes(query.toLowerCase()) ||
            emp.department.toLowerCase().includes(query.toLowerCase()) ||
            emp.id.toString().includes(query)
        );

        tbody.innerHTML = filtered.map(emp => `
            <tr>
                <td><div class="employee-info"><div class="avatar-small">${emp.name.split(' ').map(n => n[0]).join('')}</div><span>${emp.name}</span></div></td>
                <td>${emp.id}</td>
                <td>${emp.department}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.joinDate}</td>
                <td><span class="status-badge ${emp.status}">${emp.status}</span></td>
                <td>
                    <button class="btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    handleLeave(employeeName, action) {
        const request = dashboardData.leaveRequests.find(r => r.employee === employeeName);
        if (request) {
            request.status = action === 'approve' ? 'approved' : 'denied';
    
            this.pageRenderer.renderPage(this.currentPage);
            
            this.showToast(`Leave ${action === 'approve' ? 'approved' : 'denied'} for ${employeeName}`, action === 'approve' ? 'success' : 'error');
        }
    }

    approveLeave(employeeName) {
        this.handleLeave(employeeName, 'approve');
    }

    filterLeaves(status, evt) {
        const tbody = document.getElementById('leaveTableBody');
        if (!tbody) return;
    
        const filtered = status === 'all' ?
            dashboardData.leaveRequests :
            dashboardData.leaveRequests.filter(r => r.status === status);
    
        tbody.innerHTML = filtered.map(req => `
            <tr>
                <td>${req.employee}</td>
                <td>${req.date}</td>
                <td>${req.reason}</td>
                <td>${req.days}</td>
                <td><span class="status-badge ${req.status}">${req.status}</span></td>
                <td>
                    ${req.status === 'pending' ? `
                        <button class="btn-sm btn-success" onclick="window.app.handleLeave('${req.employee}', 'approve')">✓</button>
                        <button class="btn-sm btn-danger" onclick="window.app.handleLeave('${req.employee}', 'deny')">✗</button>
                    ` : 'Processed'}
                </td>
            </tr>
        `).join('');
    
        if (evt && evt.target) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            evt.target.classList.add('active');
        }
    }

    filterAttendance(date) {
        this.showToast(`Filtering attendance for ${date}`, 'info');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    initDashboardInteractions() {
        // Re-initialize dashboard-specific event listeners
        document.querySelectorAll('.action-btn.approve').forEach(btn => {
            btn.addEventListener('click', function () {
                const row = this.closest('tr');
                this.innerHTML = '<i class="fas fa-check-double"></i> Approved';
                this.style.background = '#d1fae5';
                this.style.color = '#065f46';
            });
        });
    }
}

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', () => {
    // Initialize time manager
    window.timeManager = new TimeManager();
    window.timeManager.start();

    // Initialize notification manager
    window.notificationManager = new NotificationManager();

    // Initialize main application
    window.app = new EMSApplication();

});
