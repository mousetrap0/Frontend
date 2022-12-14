import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Nav() {
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
            <div className="container">
                <div
                    className="navbar-collapse collapse justify-content-between"
                    id="navbar-content"
                >
                    <ul className="navbar-nav mr-auto">
                        {/* 메인 화면 */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="fas fa-home"></i> Home
                            </Link>
                        </li>

                        {/* 게시판 */}
                        {/*   <li className="nav-item dropdown">
                            <div
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                게시판
                            </div>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to="/bbslist">
                                    글목록
                                </Link>
                                <Link className="dropdown-item" to="/bbswrite">
                                    글추가
                                </Link>
                            </div>
                        </li> */}

                        {/* Nw Break 게시판 */}
                        <li className="nav-item dropdown">
                            <div
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                장애
                            </div>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link
                                    className="dropdown-item"
                                    to="/nwbreakchart"
                                >
                                    장애현황
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/nwbreaklist"
                                >
                                    장애목록
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/nwbreakwrite"
                                >
                                    장애작성
                                </Link>
                            </div>
                        </li>

                        {/* 선번장 게시판 */}
                        <li className="nav-item dropdown">
                            <div
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                선번장
                            </div>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to="/linelist">
                                    선번장 목록
                                </Link>
                            </div>
                        </li>
                        {/* 지표 게시판 */}
                        {/*   <li className="nav-item dropdown">
                            <div
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                지표
                            </div>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to="/ratewrite">
                                    지표작성
                                </Link>
                                <Link className="dropdown-item" to="/ratekt">
                                    KT
                                </Link>
                                <Link className="dropdown-item" to="/rateskb">
                                    SKB
                                </Link>
                                <Link className="dropdown-item" to="/ratektsat">
                                    KTsat
                                </Link>
                            </div>
                        </li> */}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {auth ? (
                            <>
                                {/* 회원 정보 */}
                                <li className="nav-item">
                                    <span className="nav-link">
                                        {" "}
                                        {auth} 님 반갑습니다{" "}
                                        <i className="fab fa-ello"></i> &nbsp;{" "}
                                    </span>
                                </li>

                                {/* 로그아웃 */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">
                                        <i className="fas fa-sign-out-alt"></i>{" "}
                                        로그아웃
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* 로그인 */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        로그인
                                    </Link>
                                </li>

                                {/* 회원가입 */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/join">
                                        회원가입
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
