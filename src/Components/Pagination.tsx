import { Flex } from '../styles'
import { PaginateNextBtn, PaginateBackBtn, PaginateBackWrapper, PaginateNextWrapper, Spinner } from './styles'
type Props = {
    loadingBack: boolean,
    loadingNext: boolean,
    onBack: () => void;
    onNext: () => void;
    disabledBack: boolean;
    disabledNext: boolean;
}
const Pagination = ({ loadingBack, loadingNext, onNext, onBack, disabledBack, disabledNext }: Props) => (
    <Flex>
        <PaginateBackWrapper disabled={disabledBack} onClick={disabledBack ? null : onBack}>
            {loadingBack ? <Spinner/> : <PaginateBackBtn /> }
        </PaginateBackWrapper>
        <PaginateNextWrapper disabled={disabledNext} onClick={ disabledNext ? null : onNext }>
            {loadingNext ? <Spinner/> : <PaginateNextBtn /> }
        </PaginateNextWrapper> 
        
    </Flex>
)


export default Pagination;