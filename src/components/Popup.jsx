import React, { useRef } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  popupContent: {
    width: "400px",
    boxShadow: "2px 2px 4px 4gba(2,2,2,0.2)",
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
}));

const Popup = ({
  isOpen,
  onRequestClose,
  position,
  onTapWantToRead,
  onTapRead,
  onTapCurrentlyReading,
  onTapNone,
}) => {
  const styles = useStyles();
  const popupRef = useRef(null);

  return (
    <Modal open={isOpen} onClose={onRequestClose} closeAfterTransition>
      <div
        ref={popupRef}
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
        <Button
          variant="contained"
          color="primary"
          className={styles.popupOptionButton}
          onClick={() => onTapCurrentlyReading()}
        >
          Currently Reading
        </Button>

        {onTapNone && (
          <Button
            variant="contained"
            color="primary"
            className={styles.popupOptionButton}
            onClick={() => onTapNone()}
          >
            None
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Popup;

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
  onTapWantToRead: PropTypes.func.isRequired,
  onTapCurrentlyReading: PropTypes.func.isRequired,
  onTapRead: PropTypes.func.isRequired,
};
