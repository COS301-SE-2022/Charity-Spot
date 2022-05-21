import styles from './client-home.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



export function Home() {
  return (
    <div>

      <Tabs>
            <TabList>
              <Tab>Map</Tab>
              <Tab>Filters</Tab>
            </TabList>

            <TabPanel>
              <img className={styles['container']} src="https://firebasestorage.googleapis.com/v0/b/charityspotdemo1.appspot.com/o/g1.png?alt=media&token=888e1913-ec8e-4508-b70a-69b590a27587"></img>
            </TabPanel>
            <TabPanel>
              <h2>Select Filters</h2>
            </TabPanel>
      
    
      

      </Tabs>
    
    </div>
  );
}

export default Home;
