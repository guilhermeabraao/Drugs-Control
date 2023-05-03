import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { api } from 'import/api/api';
import { DrugContext } from 'import/contexts/drugContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: `30vw`,
    position: 'relative',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const buttonStyle = {
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 'bold'
}

export default function Header() {

    const searchRef = React.useRef();
    const { setDrugs } = React.useContext(DrugContext);

    async function HandleSearch(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.key === 'Enter') {
            if (searchRef.current.value === '') {
                const { data } = await api.get('/drugs');
                setDrugs(data.results);
            } else {
                const { data } = await api.get(`/drugs/${searchRef.current.value}`);
                if (data.results.length > 0) {
                    setDrugs(data.results);
                }
            }
        }
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    Drugs Control
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        inputRef={searchRef}
                        onKeyUp={(e) => HandleSearch(e)}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Stack>
                    <Button variant="contained" startIcon={<AddBoxIcon />} style={buttonStyle}>
                        Register
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}