import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './SOSHome.css';
import { useCookies } from 'react-cookie';
import dt from './data/revenueData.js';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SOSHome = () => {
  const [success, setSuccess] = useState(null);
  const [altitudeData, setAltitudeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartsData, setChartsData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const cookieValue = cookies['token'];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/verifyAPIForSOS', {
          headers: {
            Authorization: `Bearer ${cookieValue}`, // Replace yourToken with the actual token value
          },
        });
        console.log(res);
        if (res.data.msg === 'Success_to_Emergency_Teams_Portal') {
          setSuccess('Welcome to Emergency Response System');
          const resAlt = await axios.get('http://localhost:5000/api/auth/altitudeData',{
            headers: {
              Authorization: `Bearer ${cookieValue}`, // Replace yourToken with the actual token value
            },
          });
          setAltitudeData(resAlt.data.altitudeData);
          const newChartsData = Object.entries(resAlt.data.altitudeData).map(([key, values]) => {
            return {
              key: key,
              labels: values.map(item => item.label),
              data: values.map(item => item.altitude)
            };
          });
          setChartsData(newChartsData);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
    <div className="AppSOS">
      <h2>Aircraft Details</h2>
    <Logout />
      {loading ? <p>Loading...</p> : chartsData.map(chart => (
        <div key={chart.key} className="dataCard revenueCard">
          <Line
            data={{
              labels: chart.labels,
              datasets: [{
                label: `Altitudes for ${chart.key}`,
                data: chart.data,
                backgroundColor: '#064FF0',
                borderColor: '#064FF0',
              }]
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: `Altitude (ft) for ${chart.key}`,
                },
              },
            }}
          />
        </div>
      ))}

    </div>
    </>
  );
};


export default SOSHome;
