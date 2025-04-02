function showToastSuccess(toastInstance, message, title = 'Thông báo') {
    toastInstance.success(`
        <div style="font-weight: bold; font-size: 16px; color: #4CAF50;">${title}</div>
        <div style="margin-top: 5px; font-size: 14px; color: #333;">${message}</div>
    `, {
        className: 'custom-toast'
    });
}

export default showToastSuccess;