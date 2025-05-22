import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; {currentYear}</div>
                    <span>This system is developed By:</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
