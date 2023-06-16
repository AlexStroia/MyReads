import React, { useRef } from "react";
import { Modal, Backdrop, Fade, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  popupContent: {
    boxShadow: "0px 2px 4px 4gba(0,0,0,0.2)",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "16px",
  },
  popupTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  popupOptionButton: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
  },
  transparentBackdrop: {
    backgroundColor: "transparent",
  },
}));

const Popup = ({
  isOpen,
  onRequestClose,
  position,
  onTapWantToRead,
  onTapRead,
  onTapCurrentlyReading,
}) => {
  const styles = useStyles();
  const popupRef = useRef(null);

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        className: styles.transparentBackdrop,
      }}
    >
      <Fade in={isOpen} innerRef={popupRef}>
        <div
          className={styles.popupContent}
          style={{
            top: position.y,
            left: position.x,
          }}
        >
          <h2 className={styles.popupTitle}>Select an Option</h2>
          <Button
            variant="contained"
            color="primary"
            className={styles.popupOptionButton}
            onClick={() => onTapCurrentlyReading()}
          >
            Currently Reading
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.popupOptionButton}
            onClick={() => onTapWantToRead()}
          >
            Want to Read
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.popupOptionButton}
            onClick={() => onTapRead()}
          >
            Read
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default Popup;
