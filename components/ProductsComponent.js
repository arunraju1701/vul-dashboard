import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import styles from '../styles/ProductsComponent.module.css'
import { Badge } from '@mui/material';

export default function ProductsComponent({ products }) {
    const router = useRouter();
    const handleOnClick = (product) => {
        const { _id: id } = product;
        router.push(`/products/${id}`);
        }
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
            {
                products.map(data => {
                    return <Grid item xs={2} sm={4} md={4} key={data._id} zeroMinWidth>

                        <div key={data._id} className={styles.card} onClick={() => handleOnClick(data)} >
                            <Badge badgeContent={data.vulnerabilities? data.vulnerabilities.length : '0'} max={99} sx={{
                                '& .MuiBadge-standard': {
                                    'border-radius': '19px',
                                    height: '38px',
                                    'min-width': '38px'
                                },

                                '& .MuiBadge-badge': {
                                    'background-color': '#ffc857',
                                    color: '#000',
                                    'font-weight': '600',
                                    'font-size': '1.5rem'
                                }
                            }}>
                                <h2>{data.title}</h2>
                                {/* <p>Vulnerabilities: {data.vulnerabilities.length}</p> */}
                            </Badge>
                        </div>

                    </Grid>
                })
            }
        </Grid >
    )
}

