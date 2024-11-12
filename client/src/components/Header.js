import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setToken }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		setToken("");
		localStorage.removeItem("token"); // 토큰 삭제
		navigate("/");
	};

	return (
		<header>
			<button onClick={handleLogout}>로그아웃</button>
		</header>
	);
};

export default Header;
