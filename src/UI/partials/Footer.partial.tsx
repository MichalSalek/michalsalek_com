import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom';
import { useLocale } from '@/src/i18n/context';

export const FooterPartial = () => {
    const {messages} = useLocale();
    return <Stack component="footer" sx={{mt: 30, pb: 1, bgcolor: 'primary.main', color: 'white'}}>
        <Container>
            <Stack sx={{alignItems: 'flex-start', flexDirection: 'column'}}>
                <Typography variant="body1" sx={{color: 'white', width: '100%', textAlign: 'center'}}><CompanyNameAtom redirectOnClick/></Typography>
                <Stack component="nav" sx={{alignItems: 'baseline', flexDirection: 'column', rowGap: 1}}>
                    {([['/', messages.home], ['/sound/', messages.sound], ['/contact/', messages.contact], ['/sitemap/', messages.sitemap]] as const).map(([href, label]) =>
                        <AppLinkAtom href={href} key={href} style={{color: 'white'}}><Typography component="span" variant="body1" sx={{display: 'inline-block', color: 'white', textDecoration: 'underline', fontWeight: 'bold'}}>{label}</Typography></AppLinkAtom>)}
                </Stack>
                <Typography variant="body2" sx={{width: '100%', mt: '2rem', fontFamily: 'Verdana', color: 'rgba(255,255,255,.85)', fontSize: '.7rem', textAlign: 'center'}}>Atomic Concept - Michał Sałek | VAT PL9442267029</Typography>
            </Stack>
        </Container>
    </Stack>;
};
