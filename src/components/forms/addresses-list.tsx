import { IBaseAddress } from "@interfaces/registration-form-data";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, Button } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography/Typography";

import AddressDataForm from "./address-form";

import styles from "./forms.module.scss";

interface IAddressesListProps {
  addresses: IBaseAddress[];
  version: number;
  defaultAddressId: string;
  typography: string;
  onSetDefault: (id: string, version: number | undefined) => void;
  onDelete: (id: string) => void;
  onAddAddress: () => void;
  onEdit: (id: string, address: IBaseAddress) => void;
}

const AddressesList = (props: IAddressesListProps) => {
  const {
    addresses,
    version,
    defaultAddressId,
    typography,
    onSetDefault,
    onDelete,
    onAddAddress,
    onEdit,
  } = props;

  const listItems = addresses.map((address: IBaseAddress, index: number) => {
    const setDefaultAddress = () => {
      if (address.id) {
        onSetDefault(address.id, undefined);
      }
    };

    const deleteAddress = () => {
      if (address.id) {
        onDelete(address.id);
      }
    };

    const onParentSubmit = (data: IBaseAddress) => {
      if (address.id) {
        onEdit(address.id, data);
      }
    };

    return address && address?.id === defaultAddressId ? (
      <li className={styles.default} key={`${address.id}${address.postalCode}`}>
        <Typography
          className={styles.h4default}
          align="center"
          variant="subtitle2"
        >
          Address {index + 1} (default):
        </Typography>
        <AddressDataForm
          {...{
            address,
            version,
            setDefaultAddress,
            defaultBtnDisabled: true,
            deleteAddress,
            onParentSubmit,
          }}
        />
      </li>
    ) : (
      <li className={styles.basic} key={`${address.id}${address.postalCode}`}>
        <Typography
          className={styles.h4basic}
          align="center"
          variant="subtitle2"
          color="primary"
        >
          Address {index + 1}:
        </Typography>
        <AddressDataForm
          {...{
            address,
            version,
            setDefaultAddress,
            defaultBtnDisabled: false,
            deleteAddress,
            onParentSubmit,
          }}
        />
      </li>
    );
  });

  return (
    <Accordion>
      <AccordionSummary
        className={styles.summary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="center" variant="h6" color="secondary">
          {typography}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul>{listItems}</ul>
        <Button
          type="button"
          variant="contained"
          color="info"
          className={styles.button}
          onClick={onAddAddress}
        >
          Add address
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddressesList;
