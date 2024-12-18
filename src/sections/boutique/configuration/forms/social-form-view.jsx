import { useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon, WhatsappIcon, SnapchatIcon, WebsiteIcon } from 'src/assets/icons';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function SocialFormView({ socialLinks }) {
  const defaultValues = {
    facebook: socialLinks.facebook || '',
    instagram: socialLinks.instagram || '',
    linkedin: socialLinks.linkedin || '',
    twitter: socialLinks.twitter || '',
    whatsapp: socialLinks.whatsapp || '',
    snapchat: socialLinks.snapchat || '',
    website: socialLinks.website || '',
  };

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
        {Object.keys(socialLinks).map((social) => (
          <Field.Text
            key={social}
            name={social}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {social === 'facebook' && <FacebookIcon width={24} />}
                  {social === 'instagram' && <InstagramIcon width={24} />}
                  {social === 'linkedin' && <LinkedinIcon width={24} />}
                  {social === 'whatsapp' && <WhatsappIcon width={24} />}
                  {social === 'snapchat' && <SnapchatIcon width={24} />}
                  {social === 'website' && <WebsiteIcon width={24} />}
                  {social === 'twitter' && (
                    <TwitterIcon width={24} sx={{ color: 'text.primary' }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        ))}

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Enregistrer
        </LoadingButton>
      </Card>
    </Form>
  );
}
