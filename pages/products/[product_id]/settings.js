import { useState } from 'react'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import PageHead from '../../../components/PageHead'
import PrivateLayout from '../../../components/PrivateLayout'
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';


export default function Setting({ product }) {
    const { title } = product;
    const [notify, setNotify] = useState({
        daily: false,
        weekly: false,
        monthly: false
    })
    const { daily, weekly, monthly } = notify;

    const handleChange = (event) => {
        setNotify({
            ...notify,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <PrivateLayout>
            <PageHead title={title + ' > Settings'} />
            <Box sx={{ m: 1, display: 'flex', border:'2px solid #f37748'}}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Select Frequency of Notification</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={daily} onChange={handleChange} name="daily" />
                            }
                            label="Daily"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={weekly} onChange={handleChange} name="weekly" />
                            }
                            label="Weekly"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={monthly} onChange={handleChange} name="monthly" />
                            }
                            label="Monthly"
                        />
                    </FormGroup>
                    <FormHelperText>Select How often you want to receive Notifications.</FormHelperText>
                    <Button variant="outlined" size="small" sx ={{m:2}}>
                        Send Sample
                    </Button>
                    <Button variant="contained" size="small" sx ={{m:2}}>
                        Save
                    </Button>
                </FormControl>
            </Box>

        </PrivateLayout>
    )
}

export async function getServerSideProps(context) {
    const { product_id } = context.query;
    const data = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${product_id}`);
    const product = await data.json();

    return {
        props: { product }
    }
}