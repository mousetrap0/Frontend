import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";

import moment from "moment";

function NwBreakDetail() {
    const { auth, setAuth } = useContext(AuthContext);

    const [nwBreak, setNwBreak] = useState({});
    const { breakId } = useParams();

    const navigate = useNavigate();

    const getNwBreakDetail = async () => {
        await axios
            .get(`http://192.168.97.7:3000/nwbreak/${breakId}`, {
                params: { readerId: auth ? auth : "" },
            })
            .then((resp) => {
                console.log("[NwBreakDetail.js] getNwBreakDetail() success :D");
                console.log(resp.data);

                setNwBreak(resp.data.nwBreak);
            })
            .catch((err) => {
                console.log("[NwBreakDetail.js] getNwBreakDetail() error :<");
                console.log(err);
            });
    };

    const cnvrt = (v) => {
        return moment(v).format("YYYY-MM-DD HH:mm");
    };

    const deleteNwBreak = async () => {
        await axios
            .delete(`http://192.168.97.7:3000/nwbreak/${breakId}`)
            .then((resp) => {
                console.log("[BbsDetail.js] deleteNwBreak() success :D");
                console.log(resp.data);

                if (resp.data.deletedRecordCount === 1) {
                    alert("게시글을 성공적으로 삭제했습니다 :D");
                    navigate("/nwbreaklist");
                }
            })
            .catch((err) => {
                console.log("[NwBreakDetail.js] deleteNwBreak() error :<");
                console.log(err);
            });
    };

    useEffect(() => {
        getNwBreakDetail();
    }, []);
    const updateNwBreak = {
        breakId: nwBreak.breakId,
        lineId: nwBreak.lineId,
        facilityGround: nwBreak.facilityGround,
        facilityName: nwBreak.facilityName,
        breakTime: cnvrt(nwBreak.breakTime),
        recoveryTime: cnvrt(nwBreak.recoveryTime),
        breakManager: nwBreak.breakManager,
        breakReason: nwBreak.breakReason,
    };

    const parentNwBreak = {
        lineId: nwBreak.lineId,
        breakReason: nwBreak.breakReason,
    };
    console.log(localStorage.getItem("id"), "1111");
    console.log(nwBreak.writer, "2222");

    return (
        <div>
            <div className="my-3 d-flex justify-content-end">
                <Link
                    className="btn btn-outline-secondary"
                    to={{ pathname: `/nwbreakanswer/${nwBreak.breakId}` }}
                    state={{ parentNwBreak: parentNwBreak }}
                >
                    <i className="fas fa-pen"></i> 답글쓰기
                </Link>{" "}
                &nbsp;
                {
                    /* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
                    localStorage.getItem("id") === nwBreak.writer ? (
                        <>
                            <Link
                                className="btn btn-outline-secondary"
                                to="/nwbreakupdate"
                                state={{ nwBreak: updateNwBreak }}
                            >
                                <i className="fas fa-edit"></i> 수정
                            </Link>{" "}
                            &nbsp;
                            <button
                                className="btn btn-outline-danger"
                                onClick={deleteNwBreak}
                            >
                                <i className="fas fa-trash-alt"></i> 삭제
                            </button>
                        </>
                    ) : null
                }
            </div>

            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="col-3">작성자</th>
                        <td>
                            <span>{nwBreak.writer}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>Break Id</th>
                        <td>
                            <span>{nwBreak.breakId}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>Break 발생일</th>
                        <td>
                            <span>{cnvrt(nwBreak.breakTime)}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>Recovery 시간</th>
                        <td>
                            <span>{cnvrt(nwBreak.recoveryTime)}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>원인</th>
                        <td>
                            <div>{nwBreak.breakReason}</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="my-3 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/nwbreaklist">
                    <i className="fas fa-list"></i> 글목록
                </Link>
            </div>
            <br />
            <br />

            {/* 댓글 작성 컴포넌트 */}
            {auth ? ( // 로그인한 사용자만 댓글 작성 가능
                <CommentWrite breakId={breakId} />
            ) : null}

            {/* 댓글 리스트 컴포넌트 */}
            <CommentList breakId={breakId} />
        </div>
    );
}

export default NwBreakDetail;
