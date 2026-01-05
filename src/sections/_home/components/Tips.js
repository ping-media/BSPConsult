// @mui
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';


import PropTypes from 'prop-types';
import React, {useRef, useEffect, useState, useCallback } from 'react';
import { MotionViewport } from 'src/components/animate';
import Image from 'src/components/image';
import { useAuthContext } from '../../../auth/useAuthContext';
import firebaseApp from '../../../firebase';
// import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Initialize Firestore
const db = getFirestore(firebaseApp);

export default function Tips({ setCurrentPage }) {
  Tips.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
  };

  const { user } = useAuthContext();

  const [publicTips, setPublicTips] = useState([]);
  const [premiumTips, setPremiumTips] = useState([]);
  const [value, setValue] = useState(0);

  const [showMenu, setShowMenu] = useState(false);
  const [addTip, setAddTip] = useState(false);
  const [addMessage, setAddMessage] = useState(false);
  const [addAnalysis, setAddAnalysis] = useState(false);

  const [docId, setDocId] = useState(null);

  const [attachImage, setAttachImage] = useState();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [bankroll, setBankroll] = useState('');
  const [minimumOdd, setMinimumOdd] = useState('');
  const [group, setGroup] = useState('');
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletedTip, setDeletedTip] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const storage = getStorage(firebaseApp);

  const groups = [
    {
      value: 'Insights',
      label: 'Insights',
    },
    {
      value: 'Bets',
      label: 'Bets',
    },
    {
      value: 'Both',
      label: 'Both',
    },
    {
      value: 'Exp-Insights',
      label: 'Exp-Insights',
    },
  ];

  const checkExpireDate = () => {
    const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
    const expireDate = new Date(sec);
    const currentDate = new Date();
    return currentDate.getTime() < expireDate.getTime();
  };

  const isSubscribed = user.membership !== '1' && checkExpireDate();  
  const isNotSilver = user.membership !== '8' && checkExpireDate();

  function createTypographyWithLineBreaks(text) {
    // Split the text by new line characters
    const lines = text.split('\n');

    // Map the lines to Typography components, adding <br /> elements in between
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== lines.length - 1 && <br />} {/* Don't add <br /> after the last line */}
      </React.Fragment>
    ));
  }

  const fetchInsightsTips = useCallback(async () => {
    try {
      // Reference to the tips collection
      const tipsCollectionRef = collection(db, 'communication');
      // Create a query against the collection
      
      const membershipLevel = Number(user?.membership);
      const groupType = membershipLevel < 8 ? 'Exp-Insights' : 'Insights';

      const q = query(
        tipsCollectionRef,
        where('group', '==', groupType), // Apply the filter
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const tipsSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const tipsList = tipsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setPublicTips(tipsList);
    } catch (error) {
      console.error('Error fetching tips: ', error);
    }
  }, [user?.membership]);

  const fetchBetTips = useCallback(async () => {
    try {
      // Reference to the tips collection
      const tipsCollectionRef = collection(db, 'communication');
      // Create a query against the collection
      const q = query(
        tipsCollectionRef,
        where('group', '==', 'Bets'), // Apply the filter
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const tipsSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const tipsList = tipsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setPremiumTips(tipsList);
    } catch (error) {
      console.error('Error fetching tips: ', error);
    }
  }, []);

  useEffect(() => {
    fetchInsightsTips();
    fetchBetTips();
  }, [fetchInsightsTips, fetchBetTips]);

  function formatDate(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${dayName}, ${day} ${month}, ${year} ${hour}:${minute}`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMessage = () => {
    setDocId(null);
    setImageUrl(null);
    setPdfUrl(null);
    setAnalysisData([]);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
    setAddMessage(true);
    setShowMenu(false);
  };

  const handleTip = () => {
    setDocId(null);
    setImageUrl(null);
    setPdfUrl(null);
    setAnalysisData([]);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
    setAddTip(true);
    setShowMenu(false);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChangeBankroll = (e) => {
    setBankroll(e.target.value);
  };
  const handleChangeMimimumOdd = (e) => {
    setMinimumOdd(e.target.value);
  };

  const handleChangeGroup = (e) => {
    setGroup(e.target.value);
  };

  const handleUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoadingMessage(true);

      const filePath = `${type}s/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if (type === "image"){
        setImageUrl(downloadURL);
        setPdfUrl('');
      }
      else if (type === "pdf"){
        setPdfUrl(downloadURL);
        setImageUrl('');
      }

      // setMessage(downloadURL)
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoadingMessage(false);
      event.target.value = ''; // reset input
    }
  };    

  // const handleAddMessage = async () => {
  //   setLoadingMessage(true);

  //   try {
  //     if (group !== 'Both') {
  //       const messageData = {
  //         date: new Date(),
  //         title,
  //         message,
  //         group,
  //         imageUrl,
  //         pdfUrl,
  //         type: 'Message',
  //       };
  //       await addDoc(collection(db, 'communication'), messageData);
  //     } else {
  //       const publicData = {
  //         date: new Date(),
  //         title,
  //         message,
  //         imageUrl,
  //         pdfUrl,
  //         group: 'Insights',
  //         type: 'Message',
  //       };
  //       await addDoc(collection(db, 'communication'), publicData);
  //       const premimumData = {
  //         date: new Date(),
  //         title,
  //         message,
  //         imageUrl,
  //         pdfUrl,
  //         group: 'Bets',
  //         type: 'Message',
  //       };
  //       await addDoc(collection(db, 'communication'), premimumData);
  //     }

  //     const messagesCollectionRef = collection(db, 'communication');
  //     // Create a query against the collection
  //     const q = query(
  //       messagesCollectionRef,
  //       where('type', '==', 'Message'), // Apply the filter
  //       orderBy('date', 'desc') // Sort by date in descending order
  //     );
  //     // Get a snapshot of the collection
  //     const messagesSnapshot = await getDocs(q);
  //     // Map through documents and set data in state
  //     const messageList = messagesSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  //     if (messageList.length > 15) {
  //       await deleteDoc(doc(db, 'communication', messageList[messageList.length - 1].id));
  //     }

  //     setTitle('');
  //     setMessage();
  //     setGroup('Insights');
  //     setAddMessage(false);
  //     fetchInsightsTips();
  //     fetchBetTips();
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //   } finally {
  //     setLoadingMessage(false);
  //   }
  // };

  const handleAddMessage = async () => {
    setLoadingMessage(true);

    try {
      const analysesList = analysisData.map((item) => JSON.stringify(item));
      const baseData = {
        title,
        message,
        imageUrl: imageUrl || null,
        pdfUrl: pdfUrl || null,
        type: 'Message',
        analyses: analysesList,
        updatedAt: serverTimestamp(),
      };

      if (docId) {
        await updateDoc(doc(db, 'communication', docId), {
          ...baseData,
        });
      }
      else if (group !== 'Both') {
        await addDoc(collection(db, 'communication'), {
          ...baseData,
          group,
          date: serverTimestamp(),
        });
      } else {
        await Promise.all([
          addDoc(collection(db, 'communication'), {
            ...baseData,
            group: 'Insights',
            date: serverTimestamp(),
          }),
          addDoc(collection(db, 'communication'), {
            ...baseData,
            group: 'Bets',
            date: serverTimestamp(),
          }),
        ]);
      }

      // =========================
      // 🔄 CLEANUP (LIMIT = 15)
      // =========================
      const q = query(
        collection(db, 'communication'),
        where('type', '==', 'Message'),
        orderBy('date', 'desc')
      );

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      if (list.length > 15) {
        await deleteDoc(doc(db, 'communication', list[list.length - 1].id));
      }

      // =========================
      // ♻️ RESET UI
      // =========================
      setTitle('');
      setMessage('');
      setImageUrl(null);
      setPdfUrl(null);
      setGroup('Insights');
      setDocId(null);
      setAddMessage(false);

      fetchInsightsTips();
      fetchBetTips();
    } catch (err) {
      console.error('Firestore error:', err);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleAddAnalysis = () => {
    setAnalysisData([
      ...analysisData,
      {
        title: analysisTitle,
        body: analysisMessage,
      },
    ]);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
  };

  const handleAddTip = async () => {
    setLoadingMessage(true);

    try {
      const analysesList = analysisData.map((item) => JSON.stringify(item));
      let imgUrl = imageUrl;

      if (attachImage) {
        // Create a reference to the image file in Firebase Storage
        const imageRef = ref(storage, `images/${Date.now()}.png`);
        // Upload the image as a string
        await uploadString(imageRef, attachImage, 'data_url');
        // Get the download URL
        imgUrl = await getDownloadURL(imageRef);
      }
 
      const baseData = {
        title,
        imageUrl: imgUrl || null,
        type: 'Tip',
        reliability: parseFloat(bankroll),
        minimumodd: parseFloat(minimumOdd),
        analyses: analysesList,
        updatedAt: serverTimestamp(),
        date: new Date(),
      };

      if (docId) {
        await updateDoc(doc(db, 'communication', docId), {
          ...baseData,
        });
      }
      else if (group !== 'Both') {
        const tipData = {
          ...baseData,
          group,
        };
        await addDoc(collection(db, 'communication'), tipData);
      } else {
        const publicData = {
          ...baseData,
          group: 'Insights',
        };
        await addDoc(collection(db, 'communication'), publicData);
        const premimumData = {
          ...baseData,
          group: 'Bets',
        };
        await addDoc(collection(db, 'communication'), premimumData);
      }

      const tipsCollectionRef = collection(db, 'communication');
      // Create a query against the collection
      const q = query(
        tipsCollectionRef,
        where('type', '==', 'Tip'), // Apply the filter
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const tipsSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const tipsList = tipsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      if (tipsList.length > 15) {
        await deleteDoc(doc(db, 'communication', tipsList[tipsList.length - 1].id));
      }

      setTitle('');
      setAttachImage();
      setBankroll('');
      setAnalysisData([]);
      setGroup('Insights');
      setAddTip(false);
      fetchInsightsTips();
      fetchBetTips();
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleDeleteTip = async () => {
    if (!deletedTip) return;

    setDeleteLoading(true);
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'communication', deletedTip.id));

      // Refresh the messages list
      await fetchInsightsTips();
      await fetchBetTips();

      // Close the delete confirmation dialog
      setDeleteConfirm(false);
      setDeletedTip(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const calculateStake = (reliability) => {
    if (user.stakingStrategy === 'Conservative') {
      return reliability;
    }
    if (user.stakingStrategy === 'Balanced') {
      return reliability * 1.5
    }
    return reliability * 2.25 || 0;
  };
  const calculateStakeAmount = (reliability) => {
    if (!user.bankroll) return 0;
    
    if (user.stakingStrategy === 'Conservative') {
      return user.bankroll * reliability / 100.00;
    }
    if (user.stakingStrategy === 'Balanced') {
      return user.bankroll * reliability * 1.5 / 100.00;
    }
    return user.bankroll * reliability * 2.25 / 100.00 || 0;
  };

  const handleCancelAttachment = () => {
    setImageUrl(null);
    setPdfUrl(null);
  };


  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  return (
    <Container
      component={MotionViewport}
      sx={{
        px: 3,
      }}
    >
      {/* addMessage */}
      <Dialog
        open={addMessage}
        onClose={() => setAddMessage(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Add a message</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => handleChangeTitle(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
          {!docId && (
            <TextField
              select
              fullWidth
              margin="dense"
              label="Group"
              defaultValue="Public"
              value={group}
              onChange={(e) => handleChangeGroup(e)}
              sx={{
                input: {
                  color: '#FFF',
                },
                label: {
                  color: '#FFF !important',
                },
                textAlign: 'left',
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: '#0d1117',
                    },
                  },
                },
              }}
            >
              {groups.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ color: '#FFF' }}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            autoFocus
            fullWidth
            multiline
            rows={10}
            type="text"
            margin="dense"
            label="Message"
            name="message"
            value={message}
            onChange={(e) => handleChangeMessage(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{ color: '#FFF', fontWeight: 600, textAlign: 'center', marginTop: '20px' }}
          >
            Analyses
          </Typography>
          {analysisData.length > 0 &&
            analysisData.map((item, index) => (
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
                  {item.title}
                </Typography>
                <DeleteOutlineIcon
                  sx={{ color: '#57636C', cursor: 'pointer' }}
                  onClick={() => {
                    setAnalysisData((prevData) => prevData.filter((_, index2) => index2 !== index));
                  }}
                />
              </Box>
            ))}
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(#047efc, #12488f)',
              ':hover': { opacity: 0.8 },
              marginTop: '20px',
              textTransform: 'none',
            }}
            onClick={() => {
              setAddAnalysis(true);
            }}
          >
            Add an analysis
          </Button>
        </DialogContent>
        <DialogActions>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(e, 'image')}
          />

          <input
            type="file"
            accept="application/pdf"
            ref={pdfInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(e, 'pdf')}
          />
          {!imageUrl && !pdfUrl ? (
            <>
              <Button
                color="inherit"
                sx={{ color: '#FFF', backgroundColor: 'transparent' }}
                onClick={() => imageInputRef.current.click()}
              >
                Image
              </Button>

              <Button
                color="inherit"
                sx={{ color: '#FFF', backgroundColor: 'transparent' }}
                onClick={() => pdfInputRef.current.click()}
              >
                PDF
              </Button>
            </>
          ) : (
            <Button
              color="error"
              variant="contained"
              onClick={handleCancelAttachment}
            >
              Remove file
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setTitle('');
              setMessage('');
              setAddMessage(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loadingMessage}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleAddMessage()}
          >
            Send
          </LoadingButton>
        </DialogActions>
      </Dialog>
      
      {/* addTip */}
      <Dialog
        open={addTip}
        onClose={() => setAddTip(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Add a tip</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => handleChangeTitle(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />

          {!docId && (
            <TextField
              select
              fullWidth
              margin="dense"
              label="Group"
              defaultValue="Public"
              onChange={(e) => handleChangeGroup(e)}
              sx={{
                input: {
                  color: '#FFF',
                },
                label: {
                  color: '#FFF !important',
                },
                textAlign: 'left',
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: '#0d1117',
                    },
                  },
                },
              }}
            >
              {groups.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ color: '#FFF' }}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            autoFocus
            fullWidth
            multiline
            type="text"
            margin="dense"
            label="Bankroll(%)"
            name="bankroll"
            value={bankroll}
            onChange={(e) => handleChangeBankroll(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />

          <TextField
            autoFocus
            fullWidth
            multiline
            type="text"
            margin="dense"
            label="Minimum Odd"
            name="minimumodd"
            value={minimumOdd}
            onChange={(e) => handleChangeMimimumOdd(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
            onClick={()=>{
              if (attachImage || imageUrl){
                setAttachImage();
                setImageUrl(null);
              }
              else{
                document.getElementById('file-input')?.click();
              }
            }}
          >
            {attachImage || imageUrl
              ? (<Button
                  color="error"
                  variant="contained"
                  onClick={()=>{
                    setAttachImage();
                    setImageUrl(null);
                  }}
                >
                  Remove file
                </Button>
                ) 
              : (<Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
                  Image
                </Typography>
              )
            }
            {(attachImage || imageUrl) && (
              <Image
                visibleByDefault
                disabledEffect
                alt="Image"
                src={attachImage || imageUrl}
                sx={{ width: 50, height: 50, borderRadius: 1 }}
              />
            )}
          </Box>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = (event) => {
                  setAttachImage(event.target.result);
                };

                reader.readAsDataURL(file);
              }
            }}
          />

          <Typography
            variant="h6"
            sx={{ color: '#FFF', fontWeight: 600, textAlign: 'center', marginTop: '20px' }}
          >
            Analyses
          </Typography>
          {analysisData.length > 0 &&
            analysisData.map((item, index) => (
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
                  {item.title}
                </Typography>
                <DeleteOutlineIcon
                  sx={{ color: '#57636C', cursor: 'pointer' }}
                  onClick={() => {
                    setAnalysisData((prevData) => prevData.filter((_, index2) => index2 !== index));
                  }}
                />
              </Box>
            ))}
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(#047efc, #12488f)',
              ':hover': { opacity: 0.8 },
              marginTop: '20px',
              textTransform: 'none',
            }}
            onClick={() => {
              setAddAnalysis(true);
            }}
          >
            Add an analysis
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setTitle('');
              setAttachImage();
              setBankroll('');
              setAnalysisData([]);
              setGroup('Insights');
              setAddTip(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loadingMessage}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleAddTip()}
          >
            Send
          </LoadingButton>
        </DialogActions>
      </Dialog>
      
      {/* add Analysis */}
      <Dialog
        open={addAnalysis}
        onClose={() => setAddAnalysis(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Add an analysis</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            label="Title"
            name="title"
            onChange={(e) => {
              setAnalysisTitle(e.target.value);
            }}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />

          <TextField
            autoFocus
            fullWidth
            multiline
            rows={10}
            type="text"
            margin="dense"
            label="Message"
            name="message"
            onChange={(e) => {
              setAnalysisMessage(e.target.value);
            }}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setAnalysisTitle('');
              setAnalysisMessage('');
              setAddAnalysis(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loadingMessage}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleAddAnalysis()}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      
      {/* delete confirm */}
      <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Delete Tip</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
              Are you sure you want to delete the tip?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setDeleteConfirm(false);
            }}
          >
            No
          </Button>
          <LoadingButton
            loading={deleteLoading}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleDeleteTip()}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: 3, mx: 'auto', maxWidth: 720, textAlign: 'center' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              span: {
                backgroundColor: '#FFF',
              },
            }}
          >
            <Tab label="Insights" {...a11yProps(0)} sx={{ flex: 1, color: '#FFF' }} />
            <Tab label="Bets" {...a11yProps(1)} sx={{ flex: 1, color: '#FFF' }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {isSubscribed && !isNotSilver ? (
            <Paper
              sx={{
                borderRadius: 3,
                textAlign: 'center',
                backgroundColor: 'transparent',
                mt: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  mt: 0,
                  columnGap: 1,
                  rowGap: 0,
                  justifyContent: 'center',
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                    minWidth: '540px',
                    borderRadius: '24px',
                    padding: '2px',
                    transition: 'all .2s',
                    position: 'relative',
                    transform: 'none',
                    boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#0d1117',
                      width: '100%',
                      height: '100%',
                      border: '1px solid rgba(239, 240, 246, .08)',
                      borderRadius: '24px',
                      transition: 'all .2s',
                      position: 'relative',
                      boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                      px: 3,
                      py: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        width: '77px',
                        height: '77px',
                        border: '2px solid #0866eb',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        justifyContent: 'center',
                      }}
                    >
                      <RemoveModeratorIcon />
                    </Box>
                    <Typography
                      sx={{ color: 'rgb(203, 213, 225)', fontWeight: 400, fontSize: '36px', mt: 2 }}
                    >
                      Upgrade Membership
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(203, 213, 225, 0.5)',
                        fontWeight: 400,
                        fontSize: '18px',
                        mt: 1,
                      }}
                    >
                      Unlock this content by upgrading your Membership
                    </Typography>
                    <Box
                      sx={{
                        background: 'linear-gradient(#047efc, #12488f)',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: '48px',
                        borderRadius: '8px',
                        mt: 4,
                        mb: 2,
                        ':hover': {
                          opacity: 0.8,
                        },
                      }}
                    >
                      <Button
                        variant="filled"
                        color="inherit"
                        sx={{
                          position: 'relative',
                          zIndex: 2, // Ensure the button text is above the overlay
                          color: '#FFF',
                          width: '100%',
                          height: '48px',
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                        onClick={() => setCurrentPage('Subscriptions')}
                      >
                        Upgrade Membership
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ) : (
            <>
            {publicTips.map((tip, index) =>{
            const stake = calculateStake(tip.reliability);
            const stakeAmount = calculateStakeAmount(tip.reliability);

            return tip.type === 'Tip' ? (
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                  borderRadius: 1,
                  padding: '2px',
                  transition: 'all .2s',
                  position: 'relative',
                  transform: 'none',
                  boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  mt: 3,
                  mb: 3,
                  maxWidth: 720,
                }}
              >
                <Paper
                  sx={{
                    boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                    backgroundColor: '#0d1117',
                    border: '0px solid rgba(239, 240, 246, .08)',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(45deg, #0863e3, transparent)',
                    }}
                  >
                    <Typography variant="h7" sx={{ color: 'primary.contrastText', mt: 1 }}>
                      {formatDate(tip.date.toDate())}
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'primary.contrastText', mb: 1 }}>
                      {tip.title}
                    </Typography>
                    {user?.role === 'administrator' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 20,
                          top: 20,
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <EditIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();

                            const parsedAnalyses = Array.isArray(tip?.analyses)
                              ? tip.analyses.map(item => {
                                  try {
                                    return JSON.parse(item);
                                  } catch {
                                    return null;
                                  }
                                }).filter(Boolean)
                              : [];
                            setAnalysisData(parsedAnalyses);
                            setAnalysisTitle('');
                            setAnalysisMessage('');
                            setAddAnalysis(false);

                            setDocId(tip.id);
                            setTitle(tip.title);
                            setBankroll(tip.reliability);
                            setMinimumOdd(tip.minimumodd);
                            setMessage(tip.message);
                            setImageUrl(tip.imageUrl);
                            setPdfUrl(tip.pdfUrl);
                            setAddTip(true);
                          }}
                        />
                        <DeleteIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(true);
                            setDeletedTip(tip);
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pb: 2,
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      px: 4,
                    }}
                  >
                    {tip.imageUrl && (
                      <Box
                        component="img"
                        alt="Logo"
                        src={tip.imageUrl}
                        sx={{
                          mt: 3,
                          borderRadius: 1,
                        }}
                      />
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, px: 1 }}>
                      <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                        Stake
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                        {(stake || 0).toFixed(2)} %
                        {/* {tip.reliability}% (€{' '}
                        {user.bankroll ? (user.bankroll * tip.reliability) / 100 : 0}) */}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, px: 1 }}>
                      <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                        Stake Amount
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                        {(stakeAmount || 0).toFixed(2)} €
                        {/* {parseFloat((tip.reliability * 1.5).toFixed(3))}% (€{' '}
                        {user.bankroll ? (user.bankroll * tip.reliability * 1.5) / 100 : 0}) */}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, px: 1 }}>
                      <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                        Minimum Odd
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                        {(tip.minimumodd || 0).toFixed(2)}
                        {/* {parseFloat((tip.reliability * 1.5).toFixed(3))}% (€{' '}
                        {user.bankroll ? (user.bankroll * tip.reliability * 1.5) / 100 : 0}) */}
                      </Typography>
                    </Box>
                    {tip.analyses.map((analyse, index2) => (
                      <>
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', fontWeight: '600', mt: 2, px: 1, textAlign: 'left' }}
                        >
                          {JSON.parse(analyse).title}
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', mt: 2, px: 1, textAlign: 'left' }}
                        >
                          {createTypographyWithLineBreaks(JSON.parse(analyse).body)}
                        </Typography>
                      </>
                    ))}
                  </Box>
                </Paper>
              </Box>
            ) : (
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                  borderRadius: 1,
                  padding: '2px',
                  transition: 'all .2s',
                  position: 'relative',
                  transform: 'none',
                  boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  mt: 3,
                  mb: 3,
                  maxWidth: 720,
                }}
              >
                <Paper
                  sx={{
                    boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                    backgroundColor: '#0d1117',
                    border: '0px solid rgba(239, 240, 246, .08)',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(45deg, #0863e3, transparent)',
                    }}
                  >
                    <Typography variant="h7" sx={{ color: 'primary.contrastText', mt: 1 }}>
                      {formatDate(tip.date.toDate())}
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'primary.contrastText', mb: 1 }}>
                      {tip.title}
                    </Typography>
                    {user?.role === 'administrator' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 20,
                          top: 20,
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <EditIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            
                            const parsedAnalyses = Array.isArray(tip?.analyses)
                              ? tip.analyses.map(item => {
                                  try {
                                    return JSON.parse(item);
                                  } catch {
                                    return null;
                                  }
                                }).filter(Boolean)
                              : [];
                            setAnalysisData(parsedAnalyses);
                            setAnalysisTitle('');
                            setAnalysisMessage('');
                            setAddAnalysis(false);

                            setDocId(tip.id);
                            setTitle(tip.title);
                            setMessage(tip.message);
                            setImageUrl(tip.imageUrl);
                            setPdfUrl(tip.pdfUrl);
                            setAddMessage(true);
                          }}
                        />
                        <DeleteIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(true);
                            setDeletedTip(tip);
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pb: 2,
                      borderBottomLeftRadius: '6px',
                      borderBottomRightRadius: '6px',
                      px: 2,
                    }}
                  >
                    {tip.pdfUrl && (
                      <Box sx={{ px: 2, mt: 2 }}>
                        <iframe
                          src={`${tip.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                          style={{
                            width: '100%',
                            height: 500,
                            border: 'none',
                          }}
                          title="pdf-preview"
                        />
                      </Box>
                    )}
                    {tip.imageUrl && (
                      <Box
                        component="img"
                        alt="Logo"
                        src={tip.imageUrl}
                        sx={{
                          mt: 3,
                          borderRadius: 1,
                        }}
                      />
                    )}
                    <Typography
                      variant="h7"
                      sx={{ color: '#FFF', px: 2, mt: 3, mb: 1, textAlign: 'left' }}
                    >
                      {tip.message}
                    </Typography>
                    {tip.analyses && tip.analyses.map((analyse, index2) => (
                      <>
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', fontWeight: '600', mt: 2, px: 1, textAlign: 'left' }}
                        >
                          {JSON.parse(analyse).title}
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', mt: 2, px: 1, textAlign: 'left' }}
                        >
                          {createTypographyWithLineBreaks(JSON.parse(analyse).body)}
                        </Typography>
                      </>
                    ))}
                  </Box>
                </Paper>
              </Box>
            );
          })}
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {!isSubscribed ? (
            <Paper
              sx={{
                borderRadius: 3,
                textAlign: 'center',
                backgroundColor: 'transparent',
                mt: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  mt: 0,
                  columnGap: 1,
                  rowGap: 0,
                  justifyContent: 'center',
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                    minWidth: '540px',
                    borderRadius: '24px',
                    padding: '2px',
                    transition: 'all .2s',
                    position: 'relative',
                    transform: 'none',
                    boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#0d1117',
                      width: '100%',
                      height: '100%',
                      border: '1px solid rgba(239, 240, 246, .08)',
                      borderRadius: '24px',
                      transition: 'all .2s',
                      position: 'relative',
                      boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                      px: 3,
                      py: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        width: '77px',
                        height: '77px',
                        border: '2px solid #0866eb',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        justifyContent: 'center',
                      }}
                    >
                      <RemoveModeratorIcon />
                    </Box>
                    <Typography
                      sx={{ color: 'rgb(203, 213, 225)', fontWeight: 400, fontSize: '36px', mt: 2 }}
                    >
                      Purchase Membership
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(203, 213, 225, 0.5)',
                        fontWeight: 400,
                        fontSize: '18px',
                        mt: 1,
                      }}
                    >
                      Please purchase a membership to move forward
                    </Typography>
                    <Box
                      sx={{
                        background: 'linear-gradient(#047efc, #12488f)',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: '48px',
                        borderRadius: '8px',
                        mt: 4,
                        mb: 2,
                        ':hover': {
                          opacity: 0.8,
                        },
                      }}
                    >
                      <Button
                        variant="filled"
                        color="inherit"
                        sx={{
                          position: 'relative',
                          zIndex: 2, // Ensure the button text is above the overlay
                          color: '#FFF',
                          width: '100%',
                          height: '48px',
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                        onClick={() => setCurrentPage('Subscriptions')}
                      >
                        Purchase Membership
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ) : (
            <>
              {premiumTips.map((tip, index) =>
                tip.type === 'Tip' ? (
                  <Box
                    sx={{
                      backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                      borderRadius: 1,
                      padding: '2px',
                      transition: 'all .2s',
                      position: 'relative',
                      transform: 'none',
                      boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                      mt: 3,
                      mb: 3,
                      maxWidth: 720,
                    }}
                  >
                    <Paper
                      sx={{
                        boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                        backgroundColor: '#0d1117',
                        border: '0px solid rgba(239, 240, 246, .08)',
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          background: 'linear-gradient(45deg, #0863e3, transparent)',
                        }}
                      >
                        <Typography variant="h7" sx={{ color: 'primary.contrastText', mt: 1 }}>
                          {formatDate(tip.date.toDate())}
                        </Typography>
                        <Typography variant="h7" sx={{ color: 'primary.contrastText', mb: 1 }}>
                          {tip.title}
                        </Typography>
                          {user?.role === 'administrator' && (
                            <Box
                              sx={{
                                position: 'absolute',
                                right: 20,
                                top: 20,
                                display: 'flex',
                                gap: 1,
                              }}
                            >
                              <EditIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                  e.stopPropagation();
    
                                  const parsedAnalyses = Array.isArray(tip?.analyses)
                                    ? tip.analyses.map(item => {
                                        try {
                                          return JSON.parse(item);
                                        } catch {
                                          return null;
                                        }
                                      }).filter(Boolean)
                                    : [];
                                  setAnalysisData(parsedAnalyses);
                                  setAnalysisTitle('');
                                  setAnalysisMessage('');
                                  setAddAnalysis(false);

                                  setDocId(tip.id);
                                  setTitle(tip.title);
                                  setBankroll(tip.reliability);
                                  setMinimumOdd(tip.minimumodd);
                                  setMessage(tip.message);
                                  setImageUrl(tip.imageUrl);
                                  setPdfUrl(tip.pdfUrl);
                                  setAddTip(true);
                                }}
                              />
                              <DeleteIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm(true);
                                  setDeletedTip(tip);
                                }}
                              />
                            </Box>
                          )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          pb: 2,
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px',
                          px: 4,
                        }}
                      >
                        {tip.pdfUrl && (
                          <Box sx={{ px: 2, mt: 2 }}>
                            <Box
                              component="iframe"
                              src={tip.pdfUrl}
                              title="pdf preview"
                              sx={{
                                width: '100%',
                                height: 300,
                                border: 'none',
                                borderRadius: 2,
                                backgroundColor: '#000',
                              }}
                            />
                          </Box>
                        )}
                        {tip.imageUrl && (
                          <Box
                            component="img"
                            alt="Logo"
                            src={tip.imageUrl}
                            sx={{
                              mt: 3,
                              borderRadius: 1,
                            }}
                          />
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                          <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                            Stake
                          </Typography>
                          <Box sx={{ flex: 1 }} />
                          <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                            {calculateStake(tip.reliability).toFixed(2)} %
                            {/* {tip.reliability}% (€{' '}
                            {user.bankroll ? (user.bankroll * tip.reliability) / 100 : 0}) */}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                          <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                            Stake Amount
                          </Typography>
                          <Box sx={{ flex: 1 }} />
                          <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                            {calculateStakeAmount(tip.reliability).toFixed(2)} €
                            {/* {parseFloat((tip.reliability * 1.5).toFixed(3))}% (€{' '}
                            {user.bankroll ? (user.bankroll * tip.reliability * 1.5) / 100 : 0}) */}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1}}>
                          <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                            Minimum Odd
                          </Typography>
                          <Box sx={{ flex: 1 }} />
                          <Typography variant="h7" sx={{ color: '#FFF', fontWeight: '600' }}>
                            {(tip.minimumodd || 0).toFixed(2)}
                            {/* {parseFloat((tip.reliability * 1.5).toFixed(3))}% (€{' '}
                            {user.bankroll ? (user.bankroll * tip.reliability * 1.5) / 100 : 0}) */}
                          </Typography>
                        </Box>
                        {tip.analyses.map((analyse, index2) => (
                          <>
                            <Typography
                              variant="h7"
                              sx={{
                                color: '#FFF',
                                fontWeight: '600',
                                mt: 2,
                                textAlign: 'left',
                              }}
                            >
                              {JSON.parse(analyse).title}
                            </Typography>
                            <Typography
                              variant="h7"
                              sx={{ color: '#FFF', mt: 2, textAlign: 'left' }}
                            >
                              {createTypographyWithLineBreaks(JSON.parse(analyse).body)}
                            </Typography>
                          </>
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                      borderRadius: 1,
                      padding: '2px',
                      transition: 'all .2s',
                      position: 'relative',
                      transform: 'none',
                      boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                      mt: 3,
                      mb: 3,
                      maxWidth: 720,
                    }}
                  >
                    <Paper
                      sx={{
                        boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                        backgroundColor: '#0d1117',
                        border: '0px solid rgba(239, 240, 246, .08)',
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          background: 'linear-gradient(45deg, #0863e3, transparent)',
                        }}
                      >
                        <Typography variant="h7" sx={{ color: 'primary.contrastText', mt: 1 }}>
                          {formatDate(tip.date.toDate())}
                        </Typography>
                        <Typography variant="h7" sx={{ color: 'primary.contrastText', mb: 1 }}>
                          {tip.title}
                        </Typography>
                        {user?.role === 'administrator' && (
                          <Box
                            sx={{
                              position: 'absolute',
                              right: 20,
                              top: 20,
                              display: 'flex',
                              gap: 1,
                            }}
                          >
                            <EditIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (tip.type === "Message"){
                                  const parsedAnalyses = Array.isArray(tip?.analyses)
                                    ? tip.analyses.map(item => {
                                        try {
                                          return JSON.parse(item);
                                        } catch {
                                          return null;
                                        }
                                      }).filter(Boolean)
                                    : [];
                                  setAnalysisData(parsedAnalyses);
                                  setAnalysisTitle('');
                                  setAnalysisMessage('');
                                  setAddAnalysis(false);

                                  setDocId(tip.id);
                                  setTitle(tip.title);
                                  setMessage(tip.message);
                                  setImageUrl(tip.imageUrl);
                                  setPdfUrl(tip.pdfUrl);
                                  setAddMessage(true);
                                }
                              }}
                            />
                            <DeleteIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(true);
                                setDeletedTip(tip);
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      <Box
                        sx={{
                          mt: 3,
                          px: 4,
                        }}
                      >
                        {tip.pdfUrl && (
                          <Box sx={{ px: 2, mt: 2 }}>
                            <iframe
                              src={`${tip.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                              style={{
                                width: '100%',
                                height: 500,
                                border: 'none',
                              }}
                              title="pdf-preview"
                            />
                          </Box>
                        )}
                        {tip.imageUrl && (
                          <Box
                            component="img"
                            alt="Logo"
                            src={tip.imageUrl}
                            sx={{
                              borderRadius: 1,
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          pb: 2,
                          borderBottomLeftRadius: '6px',
                          borderBottomRightRadius: '6px',
                          px: 2,
                        }}
                      >
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', px: 2, mt: 3, mb: 1, textAlign: 'left' }}
                        >
                          {createTypographyWithLineBreaks(tip.message)}
                        </Typography>
                        {tip.analyses.map((analyse, index2) => (
                          <>
                            <Typography
                              variant="h7"
                              sx={{
                                color: '#FFF',
                                fontWeight: '600',
                                mt: 2,
                                textAlign: 'left',
                              }}
                            >
                              {JSON.parse(analyse).title}
                            </Typography>
                            <Typography
                              variant="h7"
                              sx={{ color: '#FFF', mt: 2, textAlign: 'left' }}
                            >
                              {createTypographyWithLineBreaks(JSON.parse(analyse).body)}
                            </Typography>
                          </>
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                )
              )}
            </>
          )}
        </CustomTabPanel>
        {user?.role === 'administrator' && (
          <>
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: 'fixed',
                bottom: 50,
                right: 24,
                background: 'linear-gradient(#047efc, #12488f)',
                ':hover': { opacity: 0.8 },
              }}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              {showMenu ? <CloseIcon /> : <AddIcon />}
            </Fab>
            {showMenu && (
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 120,
                  right: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'end',
                  gap: '12px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyItems: 'right',
                    gap: '12px',
                  }}
                >
                  <Typography>Add a message</Typography>
                  <Button
                    sx={{
                      backgroundColor: '#12488f',
                      borderRadius: '100px',
                      minWidth: 36,
                      minHeight: 36,
                    }}
                    onClick={() => handleMessage()}
                  >
                    <ChatIcon sx={{ color: '#FFF', width: 20, height: 20 }} />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyItems: 'right',
                    gap: '12px',
                  }}
                >
                  <Typography>Add a tip</Typography>
                  <Button
                    sx={{
                      backgroundColor: '#12488f',
                      borderRadius: '100px',
                      minWidth: 36,
                      minHeight: 36,
                    }}
                    onClick={() => handleTip()}
                  >
                    <BarChartIcon sx={{ color: '#FFF', width: 20, height: 20 }} />
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}
