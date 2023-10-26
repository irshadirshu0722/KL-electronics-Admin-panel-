import { render,screen,cleanup } from "@testing-library/react";
import {SearchBar} from '../search_bar'


test("should render Category component",()=>{
    render(<SearchBar/>);
    // const categoryElement = screen.getAllByTestId('todo-1');
//    expect(categoryElement).toBeInTheDocument();
})