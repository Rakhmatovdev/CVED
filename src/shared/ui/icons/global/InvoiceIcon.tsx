import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const InvoiceSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M3.33203 15.538V6.71172C3.33203 4.33338 3.33203 3.14421 4.06426 2.40536C4.7965 1.6665 5.97501 1.6665 8.33203 1.6665H11.6654C14.0224 1.6665 15.2009 1.6665 15.9331 2.40536C16.6654 3.14421 16.6654 4.33338 16.6654 6.71172V15.538C16.6654 16.7978 16.6654 17.4276 16.2804 17.6755C15.6513 18.0808 14.6788 17.231 14.1896 16.9226C13.7854 16.6677 13.5834 16.5403 13.3591 16.5329C13.1168 16.5249 12.9111 16.6472 12.4744 16.9226L10.882 17.9268C10.4524 18.1977 10.2377 18.3332 9.9987 18.3332C9.7597 18.3332 9.54495 18.1977 9.11536 17.9268L7.52297 16.9226C7.11882 16.6677 6.91675 16.5403 6.69247 16.5329C6.45013 16.5249 6.24447 16.6472 5.80776 16.9226C5.31866 17.231 4.34609 18.0808 3.71699 17.6755C3.33203 17.4276 3.33203 16.7978 3.33203 15.538Z"
      stroke="#6B7280"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.16797 9.1665H6.66797"
      stroke="#6B7280"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.668 5.8335H6.66797"
      stroke="#6B7280"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function InvoiceIcon(): ReactElement {
  return <Icon component={InvoiceSvg} />;
}
