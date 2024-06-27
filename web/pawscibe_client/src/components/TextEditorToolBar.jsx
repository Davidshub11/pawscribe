// src/components/Toolbar.jsx

import React, { useState } from 'react';
import {
  AppBar,
  MenuItem,
  Select,
  Toolbar as MUIToolbar,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import {
  Save,
  FileCopy,
  Public,
  Lock,
  Chat,
  PlayArrow,
  Groups2,
  Folder,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import MenuDrawer from './MenuDrawer';

const EditorToolbar = ({
  onThemeChange,
  onLanguageChange,
  onFontWeightChange,
  onFontSizeChange,
  onFontFamilyChange,
  onSaveToBackend,
  onSaveToFile,
  onCollaborate,
  onTogglePublic,
  runCode,
  toggleChat,
}) => {
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('plaintext');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Courier New');
  const [isPublic, setIsPublic] = useState(false);

  const handleThemeChange = event => {
    setTheme(event.target.value);
    onThemeChange(event.target.value);
  };

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
    onLanguageChange(event.target.value);
  };

  const handleFontWeightChange = event => {
    setFontWeight(event.target.value);
    onFontWeightChange(event.target.value);
  };

  const handleFontSizeChange = event => {
    setFontSize(event.target.value);
    onFontSizeChange(event.target.value);
  };

  const handleFontFamilyChange = event => {
    setFontFamily(event.target.value);
    onFontFamilyChange(event.target.value);
  };

  const handleTogglePublic = () => {
    setIsPublic(!isPublic);
    onTogglePublic(!isPublic);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#616161',
          color: '#fff',
          fontFamily: 'Raleway',
          fontWeight: 1000,
        }}
      >
        <MUIToolbar>
          <MenuDrawer />

          <Tooltip
            title="Save As Script"
            sx={{ marginRight: 0.5, marginLeft: 0.5 }}
          >
            <IconButton color="inherit" onClick={onSaveToBackend}>
              <Folder />
            </IconButton>
          </Tooltip>

          <FormControl
            variant="outlined"
            size="small"
            sx={{ marginRight: 1, marginLeft: 1 }}
          >
            <InputLabel
              sx={{ color: '#fff', fontFamily: 'Raleway', fontWeight: 1000 }}
            >
              Theme
            </InputLabel>
            <Select
              sx={{
                color: '#fff',
                fontFamily: 'Raleway',
                fontWeight: 1000,
                border: 0,
              }}
              value={theme}
              onChange={handleThemeChange}
              label="Theme"
            >
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="vs-dark"
              >
                Dark
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="vs-light"
              >
                Light
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            size="small"
            sx={{ marginRight: 1, marginLeft: 1 }}
          >
            <InputLabel
              sx={{ color: '#fff', fontFamily: 'Raleway', fontWeight: 1000 }}
            >
              Language
            </InputLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
              label="Language"
              sx={{ color: '#fff', fontFamily: 'Raleway', fontWeight: 1000 }}
            >
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="plaintext"
              >
                Plain Text
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="javascript"
              >
                JavaScript
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="python"
              >
                Python
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="css"
              >
                CSS
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="html"
              >
                HTML
              </MenuItem>
              {/* Add more languages as needed */}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            size="small"
            label="Font Size"
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            sx={{
              color: '#fff',
              fontFamily: 'Raleway',
              fontWeight: 1000,
              marginRight: 1,
              marginLeft: 1,
            }}
          />
          <FormControl
            variant="outlined"
            size="small"
            sx={{ marginRight: 1, marginLeft: 1 }}
          >
            <InputLabel
              sx={{ color: '#fff', fontFamily: 'Raleway', fontWeight: 1000 }}
            >
              Font Weight
            </InputLabel>
            <Select
              value={fontWeight}
              onChange={handleFontWeightChange}
              label="Font Weight"
              sx={{ color: '#fff', fontFamily: 'Raleway', fontWeight: 1000 }}
            >
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="normal"
              >
                Normal
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="bold"
              >
                Bold
              </MenuItem>
              <MenuItem
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: 1000,
                }}
                value="1000"
              >
                Bolder
              </MenuItem>
            </Select>
          </FormControl>

          <Select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              color: '#fff',
              fontFamily: 'Raleway',
              fontWeight: 1000,
              marginRight: 1,
              marginLeft: 1,
            }}
          >
            <MenuItem value="Courier New" sx={{ fontFamily: 'Courier New' }}>
              Courier New
            </MenuItem>
            <MenuItem
              value="Arial"
              sx={{ fontFamily: 'Arial', fontWeight: 1000 }}
            >
              Arial
            </MenuItem>
            <MenuItem
              value="Times New Roman"
              sx={{ fontFamily: 'Times New Roman', fontWeight: 1000 }}
            >
              Times New Roman
            </MenuItem>

            <MenuItem
              value="Raleway"
              sx={{ fontFamily: 'Raleway', fontWeight: 1000 }}
            >
              Raleway
            </MenuItem>

            <MenuItem
              value="Sevillana"
              sx={{ fontFamily: 'Sevillana', fontWeight: 1000 }}
            >
              Sevillana
            </MenuItem>

            <MenuItem
              value="Pacifico"
              sx={{ fontFamily: 'Pacifico', fontWeight: 1000 }}
            >
              Pacifico
            </MenuItem>

            <MenuItem
              value="Roboto"
              sx={{ fontFamily: 'Roboto', fontWeight: 1000 }}
            >
              Roboto
            </MenuItem>
          </Select>

          <Tooltip title="Save As File" sx={{ marginRight: 1, marginLeft: 1 }}>
            <IconButton color="inherit" onClick={onSaveToFile}>
              <FileCopy />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Save As Script"
            sx={{ marginRight: 1, marginLeft: 1 }}
          >
            <IconButton color="inherit" onClick={onSaveToBackend}>
              <Save />
            </IconButton>
          </Tooltip>

          <Tooltip title="Chat" sx={{ marginRight: 1, marginLeft: 1 }}>
            <IconButton color="inherit" onClick={toggleChat}>
              <Chat />
            </IconButton>
          </Tooltip>

          <Tooltip title="Collaborate" sx={{ marginRight: 1, marginLeft: 1 }}>
            <IconButton color="inherit" onClick={onCollaborate}>
              <Groups2 />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Script Privacy"
            sx={{ marginRight: 1, marginLeft: 1 }}
          >
            <IconButton color="inherit" onClick={handleTogglePublic}>
              {isPublic ? <Lock /> : <Public />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Run Code" sx={{ marginRight: 1, marginLeft: 1 }}>
            <IconButton color="inherit" onClick={runCode}>
              <PlayArrow />
            </IconButton>
          </Tooltip>
        </MUIToolbar>
      </AppBar>
    </motion.div>
  );
};

export default EditorToolbar;
