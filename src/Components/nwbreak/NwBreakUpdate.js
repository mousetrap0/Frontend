import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import moment from "moment";

function NwBreakUpdate() {
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();
    const { nwBreak } = location.state;

    console.log(nwBreak, "!!!");

    /*     const [title, setTitle] = useState(nwBreak.title);
    const [content, setContent] = useState(nwBreak.content);
 */
    const [lineId, setLineId] = useState(nwBreak.lineId);
    const [facilityGround, setFacilityGround] = useState(
        nwBreak.facilityGround
    );
    const [facilityName, setFacilityName] = useState(nwBreak.facilityName);
    const [breakTime, setBreakTime] = useState(nwBreak.breakTime);
    console.log(nwBreak.breakTime, "breakTime");
    const [recoveryTime, setRecoveryTime] = useState(nwBreak.recoveryTime);
    const [breakManager, setBreakManager] = useState(nwBreak.breakManager);
    const [breakReason, setBreakReason] = useState(nwBreak.breakReason);

    /*     const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeContent = (event) => {
        setContent(event.target.value);
    }; */

    const changeLineId = (event) => {
        setLineId(event.target.value);
    };
    const changeFacilityground = (event) => {
        setFacilityGround(event.target.value);
    };

    const changeFacilityname = (event) => {
        setFacilityName(event.target.value);
    };
    const changeBreaktime = (event) => {
        setBreakTime(event.target.value);
    };

    const changeRecoverytime = (event) => {
        setRecoveryTime(event.target.value);
    };

    const changeBreakmanager = (event) => {
        setBreakManager(event.target.value);
    };
    const changeBreakreason = (event) => {
        setBreakReason(event.target.value);
    };

    const cnvrt = (v) => {
        return moment(v).format("yyyy-MM-ddThh:mm");
    };
    const updateNwBreak = async () => {
        const req = {
            /*  id: auth,
            title: title,
            content: content, */
            lineId: lineId,
            facilityGround: facilityGround,
            facilityName: facilityName,
            breakTime: cnvrt(breakTime),
            recoveryTime: cnvrt(recoveryTime),
            breakManager: breakManager,
            breakReason: breakReason,
            writer: localStorage.getItem("id"),
        };

        await axios
            .patch(`http://192.168.97.7:3000/nwBreak/${nwBreak.breakId}`, req, {
                headers: headers,
            })
            .then((resp) => {
                console.log("[NwBreakUpdate.js] updateNwBreak() success :D");
                console.log(resp.data, "resq.data");

                if (resp.data.updatedRecordCount == 1) {
                    alert("???????????? ??????????????? ?????????????????? :D");
                    navigate(`/nwbreakdetail/${nwBreak.breakId}`); // ??? ????????? ??????
                }
            })
            .catch((err) => {
                console.log("[NwBreakUpdate.js] updatenNwBreak() error :<");
                console.log(err);
            });
    };

    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th className="table-primary">?????????</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={localStorage.getItem("id")}
                                size="50px"
                                readOnly
                            />
                        </td>
                    </tr>

                    <tr>
                        <th className="table-primary">Line ID</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={lineId}
                                onChange={changeLineId}
                                size="50px"
                            />
                        </td>
                    </tr>

                    <tr>
                        <th className="table-primary">????????????</th>

                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={facilityGround}
                                onChange={changeFacilityground}
                                size="50px"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="table-primary">?????????</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={facilityName}
                                onChange={changeFacilityname}
                                size="50px"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="table-primary">Break ??????</th>
                        <td>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={breakTime}
                                onChange={changeBreaktime}
                                size="50px"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="table-primary">?????? ??????</th>
                        <td>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={recoveryTime}
                                onChange={changeRecoverytime}
                                size="50px"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="table-primary">Break ?????????</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={breakManager}
                                onChange={changeBreakmanager}
                                size="50px"
                            />
                        </td>
                    </tr>

                    <tr>
                        <th className="table-primary">Break ??????</th>
                        <td>
                            <textarea
                                className="form-control"
                                value={breakReason}
                                onChange={changeBreakreason}
                                rows="10"
                            ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="my-3 d-flex justify-content-center">
                <button className="btn btn-dark" onClick={updateNwBreak}>
                    <i className="fas fa-pen"></i> ????????????
                </button>
            </div>
        </div>
    );
}

export default NwBreakUpdate;
