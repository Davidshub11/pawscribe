import React, { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  CardContent,
  CardActions,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import Groups2Icon from '@mui/icons-material/Groups2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { motion } from 'framer-motion';
import { Notify } from '../utils/Notification';
import { useDispatch } from 'react-redux';
import { addFileBlob } from '../store/fileBlobSlice';
import ModalCore from './ModalCore';
import AlertDialog from './Alert';
import '../css/fileview.css';

const FileView = ({ file, setStateChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [iframeSrc, setIframeSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const base = process.env.REACT_APP_BASE_API_URL;
  const token = localStorage.getItem('jwt_token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(
          `${base}/Api/v1/files/download/${file.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob',
          }
        );
        const url = URL.createObjectURL(response.data);
        //const url = URL.createObjectURL(new Blob([response.data]));
        setIframeSrc(url);
        dispatch(addFileBlob({ id: file.id.toString(), blob: response.data }));
        console.log('here====', response.data);
      } catch (error) {
        if (
          error.response.data.msg &&
          error.response.data.msg == 'Token has expired'
        )
          navigate('/');
        else
          Notify({
            message: `${error.message}. ${error.response.data.message}`,
            type: 'error',
          });
      }
    };

    fetchFile();
  }, [file.id]);

  const handleCloseAll = () => {
    setOpen(false);
    handleMenuClose();
  };

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    setDialogOpen(true);
  };

  const handleNo = () => {
    setDialogOpen(false);
  };

  const handleYes = async () => {
    try {
      const response = await axios.delete(`${base}/Api/v1/files/${file.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Notify({ message: response.data.message, type: 'success' });
    } catch (error) {
      if (
        error.response.data.msg &&
        error.response.data.msg == 'Token has expired'
      )
        navigate('/');
      else
        Notify({
          message: `${error.message}. ${error.response.data.message}`,
          type: 'error',
        });
    }
    setStateChange(true);
    setDialogOpen(false);
    handleMenuClose();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = iframeSrc;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleMenuClose();
    Notify({ message: 'File Downloaded', type: 'success' });
  };

  const handlePrivacy = async () => {
    try {
      const response = await axios.get(
        `${base}/Api/v1/files/private/${file.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Notify({ message: response.data.message, type: 'success' });
      console.log(response.data);
    } catch (error) {
      if (
        error.response.data.msg &&
        error.response.data.msg == 'Token has expired'
      )
        navigate('/');
      else
        Notify({
          message: `${error.message}. ${error.response.data.message}`,
          type: 'error',
        });
    }
    setStateChange(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    // Edit logic here
    handleMenuClose();
  };

  const handleOpen = () => {
    const params = { id: file.id, src: iframeSrc };
    /* navigate({
            pathname: '/view',
            Search: `?${createSearchParams(params)}`
        })*/
    navigate(`/viewfile?${createSearchParams(params)}`);
    handleMenuClose();
  };

  const handleShare = async () => {
    try {
      const response = await axios.get(
        `${base}/Api/v1/files/share/${file.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Notify({ message: response.data.message, type: 'success' });
    } catch (error) {
      if (
        error.response.data.msg &&
        error.response.data.msg == 'Token has expired'
      )
        navigate('/');
      else
        Notify({
          message: `${error.message}. ${error.response.data.message}`,
          type: 'error',
        });
    }
    setStateChange(true);
    if (file.private == true) setOpen(true);
    else handleMenuClose();
  };

  let PrivateViewIcon;
  if (file.private == true) {
    PrivateViewIcon = LockIcon;
  } else PrivateViewIcon = LockOpenIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.9 }}
    >
      <div title={file.filename} className="card">
        <CardContent>
          <div className="filename">{file.filename}</div>
          <iframe
            src={iframeSrc}
            style={{ width: '100%', height: '200px', border: 'none' }}
            title={file.name}
          ></iframe>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon color="primary" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>
              <EditIcon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              <div className="menuitem"> Edit</div>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteForeverIcon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              <div className="menuitem">Delete</div>
            </MenuItem>
            <MenuItem onClick={handleShare}>
              <ShareIcon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              <div className="menuitem">Share</div>
            </MenuItem>
            <MenuItem onClick={handleDownload}>
              <FileDownloadIcon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              <div className="menuitem">Download</div>
            </MenuItem>
            <MenuItem onClick={handleShare}>
              <Groups2Icon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              <div className="menuitem">Collaborate</div>
            </MenuItem>
            <MenuItem onClick={handlePrivacy}>
              <PrivateViewIcon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              {file && file.private ? (
                <div className="menuitem">Private</div>
              ) : (
                <div className="menuitem">Public</div>
              )}
            </MenuItem>
            <MenuItem onClick={handleOpen}>
              <InfoIcon
                sx={{ fontSize: 25, color: '#616161', paddingRight: 1 }}
              />
              <div className="menuitem">File Details</div>
            </MenuItem>
          </Menu>
        </CardActions>
      </div>
      <ModalCore
        open={open}
        handleClose={handleCloseAll}
        view_type={'keyView'}
        file={file}
      />
      <AlertDialog
        title={'Alert'}
        message={`Delete ${file.filename} completely ?`}
        handleYes={handleYes}
        handleNo={handleNo}
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
    </motion.div>
  );
};

FileView.propTypes = {
  file: PropTypes.array.isRequired,
  setStateChange: PropTypes.func.isRequired,
};

export default FileView;
