import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const MyComponent = () => {
    const [categories, setCategories] = useState([]);
    const [joke, setJoke] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.chucknorris.io/jokes/categories');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const fetchJoke = async (category) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
            setJoke(response.data.value);
            setSelectedCategory(category);
            setLoading(false);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching joke:', error);
            setLoading(false);
        }
    };

    const handleButtonClick = (category) => {
        fetchJoke(category);
    };
    const handleNextClick = () => {
        if (selectedCategory) {
            fetchJoke(selectedCategory);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Container maxWidth="md"> {/* You can adjust the maxWidth to your preference */}
                <Grid container spacing={8}>
                    {categories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardContent >
                                    <Button fullWidth onClick={() => handleButtonClick(category)}>
                                        {category}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {selectedCategory}
                    <IconButton style={{position: 'absolute', right: '10px', top: '10px'}} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <DialogContent>
                        <p>{joke}</p>
                    </DialogContent>
                )}

                <DialogActions>
                    <Button onClick={handleNextClick} color="primary"  fullWidth >
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MyComponent;


