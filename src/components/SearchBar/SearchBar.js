import toast, { Toaster } from 'react-hot-toast';
import {
  HeaderSection,
  FormInput,
  FormLabel,
  StyledIcon,
  SubmitBtn,
} from './SearchBar.styled';

export const SearchBar = ({ changeQuery }) => {
  return (
    <HeaderSection>
      <form
        onSubmit={event => {
          event.preventDefault();

          if (event.target.elements.query.value.trim() === '') {
            toast.error('Field must not be empty');
            return;
          }

          changeQuery(event.target.elements.query.value);
          event.target.reset();
        }}
      >
        <FormLabel>
          <SubmitBtn type="submit">
            <StyledIcon />
          </SubmitBtn>

          <FormInput
            type="text"
            name="query"
            placeholder="Search images and photos"
          />
        </FormLabel>
      </form>
      <Toaster />
    </HeaderSection>
  );
};
