import React, { useState } from 'react'
import { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UserContext } from '../../Context/UserContext';
import Cancelled from '../Components/Cancelled';
import Profile from '../Components/Profile';
import Stayting from '../Components/Stayting';
import ToPay from '../Components/ToPay';
export default function Purchase() {

    const { user } = useContext(UserContext);
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <div className="container-xxl py-5 bill-information  bg-white">
                <div className="container">
                    <div className='row'>
                        <div className='col-4'>
                            {
                                user.profile && (
                                    <>
                                        <Profile user={user} />
                                    </>
                                )
                            }
                        </div>
                        <div className='col-8'>
                            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                                <TabList >
                                    <Tab>To Pay</Tab>
                                    <Tab>Stayting</Tab>
                                    <Tab>Stayed</Tab>
                                    <Tab>Cancelled</Tab>
                                </TabList>

                                <TabPanel>
                                    <ToPay onTab={setTabIndex} />
                                </TabPanel>
                                <TabPanel>
                                    <Stayting />
                                </TabPanel>
                                <TabPanel>
                                    <Stayting />
                                </TabPanel>
                                <TabPanel>
                                    <Cancelled />
                                </TabPanel>
                            </Tabs>
                        </div></div>
                </div>
            </div>


        </>
    )
}
