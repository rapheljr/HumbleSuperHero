import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
  Stack,
} from '@mui/material';

interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const App = () => {
  const [name, setName] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState('');
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [errors, setErrors] = useState({
    name: '',
    superpower: '',
    humilityScore: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchSuperheroes = async () => {
    const response = await axios.get(`${API_URL}/superheroes`);
    setSuperheroes(response.data);
  };

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const validateFields = () => {
    const newErrors = { name: '', superpower: '', humilityScore: '' };
    if (!name) newErrors.name = 'Name is required';
    if (!superpower) newErrors.superpower = 'Superpower is required';
    if (
      !humilityScore ||
      Number(humilityScore) < 1 ||
      Number(humilityScore) > 10
    )
      newErrors.humilityScore = 'Humility Score must be between 1 and 10';
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  };

  const addSuperhero = async () => {
    if (!validateFields()) return;
    try {
      await axios.post(`${API_URL}/superheroes`, {
        name,
        superpower,
        humilityScore: Number(humilityScore),
      });
      setName('');
      setSuperpower('');
      setHumilityScore('');
      setErrors({ name: '', superpower: '', humilityScore: '' });
      setSuccess('Superhero added successfully!');
      fetchSuperheroes();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'>
      <Container
        maxWidth='sm'
        style={{ textAlign: 'center' }}>
        <Typography
          variant='h4'
          gutterBottom>
          Humble Superheroes
        </Typography>
        {success && <Alert severity='success'>{success}</Alert>}
        {error && <Alert severity='error'>{error}</Alert>}
        <TextField
          fullWidth
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin='normal'
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label='Superpower'
          value={superpower}
          onChange={(e) => setSuperpower(e.target.value)}
          margin='normal'
          error={!!errors.superpower}
          helperText={errors.superpower}
        />
        <TextField
          fullWidth
          label='Humility Score (1-10)'
          type='number'
          value={humilityScore}
          onChange={(e) => setHumilityScore(e.target.value)}
          margin='normal'
          error={!!errors.humilityScore}
          helperText={errors.humilityScore}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={addSuperhero}
          style={{ marginTop: '10px' }}>
          Add Superhero
        </Button>
        <List style={{ width: '100%', marginTop: '20px' }}>
          {superheroes.map((hero, index) => (
            <ListItem
              key={index}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                variant='outlined'
                style={{ width: '100%' }}>
                <CardContent>
                  <Stack
                    direction='row'
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='div'>
                      {hero.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='h6'
                      component='div'>
                      Humility Score: {hero.humilityScore}
                    </Typography>
                  </Stack>

                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary' }}>
                    {hero.superpower}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default App;
