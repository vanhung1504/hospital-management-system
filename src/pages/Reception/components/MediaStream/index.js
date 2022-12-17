import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiCamera3Line } from "react-icons/ri";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { TbCapture } from "react-icons/tb";
import { toast } from "react-toastify";
import styles from "./MediaStream.module.scss";
const cx = classNames.bind(styles);

function MediaStream({ setShowStream, setAvatar }) {
  const [stream, setStream] = useState(false);

  const initMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 400, height: 400 },
      });
      window.stream = stream;
      const video = document.getElementById("video");
      video.srcObject = stream;
    } catch (e) {
      toast.error(e.toString());
    }
  }, []);

  const snapAvatar = () => {
    const video = document.getElementById("video");
    var canvas = document.createElement("canvas");
    canvas.height = 400;
    canvas.width = 400;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 400, 400);
    const imgBase64 = canvas.toDataURL();
    stopStream();
    setAvatar(imgBase64);
    setShowStream(false);
  };

  useEffect(() => {
    stream && initMedia();

    return () => stopStream;
  }, [stream, initMedia]);

  const stopStream = () => {
    try {
      const video = document.getElementById("video");
      const mediaStream = video.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
    } catch {}
  };

  stopStream();

  return (
    <Modal
      show={true}
      onHide={() => {
        stopStream();
        setShowStream(false);
      }}
      backdrop="static"
      keyboard={false}
      className="mt-2"
    >
      <Modal.Header closeButton className="bg-info">
        <Modal.Title>Chụp ảnh</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-info">
        <div
          className={cx(
            "w-100 d-flex justify-content-center align-items-center"
          )}
        >
          <div
            className={cx(
              "img-holder",
              "d-flex justify-content-center align-items-center fs-1 fw-lighter text-success overflow-hidden"
            )}
          >
            {stream ? (
              <video id="video" playsInline autoPlay />
            ) : (
              <RiCamera3Line />
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-info d-flex justify-content-between">
        <Button onClick={() => setStream(!stream)}>
          {stream ? (
            <BsStopCircle className="me-1 fs-4" />
          ) : (
            <BsPlayCircle className="me-1 fs-4" />
          )}

          {stream ? "Stop stream" : "Start stream"}
        </Button>
        {stream && (
          <Button onClick={() => snapAvatar()}>
            <TbCapture className="me-1 fs-4" />
            Take Photo
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default memo(MediaStream);
