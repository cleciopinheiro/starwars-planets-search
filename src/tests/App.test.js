import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Provider from '../contexts/Provider';
import mockData from '../tests/helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Verifique os testes da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockData)
    });
    render(
      <Provider>
        <App />
      </Provider>
    )
  });

  test('Verifique se no componente Header é renderizado um título e um input de filtro', () => {
    const title = screen.getByRole('heading', {  name: /starwars!/i});
    expect(title).toBeInTheDocument();

    const nameFilter = screen.getByRole('textbox');
    expect(nameFilter).toBeInTheDocument();
  });

  test('Verifique se o loading é renderizado de acordo com o estado', async() => {
    expect(screen.getByText(/carregando.../i)).toBeInTheDocument;
    await waitFor(() => {
     expect(screen.getByText(/carregando.../i)).not.toBeInTheDocument;
    })
  });

  test('Verifique se o input para filtrar pelo nome está em funcionamento', async () => {
    const nameFilter = screen.getByTestId('name-filter')
    userEvent.type(nameFilter, 'a');
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
    })
    userEvent.clear(nameFilter);
    expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
  });

  test('Verifique se renderiza os elementos select column, select operator, input number e um button', () => {
    const selectColumn = screen.getByTestId('column-filter')
    expect(selectColumn).toBeInTheDocument();

    const selectCompare = screen.getByTestId('comparison-filter')
    expect(selectCompare).toBeInTheDocument();

    const valueFilter = screen.getByRole('spinbutton');
    expect(valueFilter).toBeInTheDocument();

    const buttonAddFilter = screen.getByRole('button', {  name: /filtrar/i});
    expect(buttonAddFilter).toBeInTheDocument();
  });

  test('Verifica a funcionalidade dos filtros', async () => {
    const selectColumn = screen.getByTestId('column-filter')
    const selectCompare = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByRole('spinbutton');
    const filterBtn = await screen.findByRole('button', {  name: /filtrar/i});
    const removeAllBtn = await screen.findByRole('button', {  name: /remover filtros/i});
    const deleteFilter = screen.queryByRole('button', {  name: 'Excluir'});
    expect(deleteFilter).not.toBeInTheDocument();

    userEvent.selectOptions(selectColumn, 'orbital_period');
    expect(selectColumn).toHaveValue('orbital_period');

    userEvent.selectOptions(selectCompare, 'igual a');
    expect(selectCompare).toHaveValue('igual a');

    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '304');
    expect(valueFilter).toHaveValue(304);

    userEvent.click(filterBtn);

    await waitFor(() => {
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      expect(screen.queryByRole('cell', {  name: /hoth/i})).not.toBeInTheDocument();
      expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();

      expect(screen.queryByDisplayValue('orbital_period')).not.toBeInTheDocument();

      const filter = screen.getByTestId('filter');
      expect(filter).toBeInTheDocument();
      expect(filter.firstChild).toHaveTextContent('orbital_period igual a 304');

      const newDeleteFilter = screen.getByRole('button', {  name: 'Excluir'});
      expect(newDeleteFilter).toBeInTheDocument();
      userEvent.click(newDeleteFilter)
      expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
    });

    expect(selectColumn.children).toHaveLength(5);
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectCompare, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '10000');
    userEvent.click(filterBtn);
    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectCompare, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '30000000');
    userEvent.click(filterBtn);

    await waitFor(() => {
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      expect(screen.getByRole('cell', {  name: /endor/i})).toBeInTheDocument();
      expect(screen.queryByRole('cell', {  name: /tatooine/i})).not.toBeInTheDocument();
      expect(selectColumn.children).toHaveLength(3);
    });

    userEvent.click(removeAllBtn);
    await waitFor(() => {
      expect(screen.getAllByRole('cell')).toHaveLength(130);
    });

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectCompare, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '23');
    userEvent.click(filterBtn);
    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(4);
      expect(screen.getAllByRole('cell')).toHaveLength(65);
    });
    userEvent.selectOptions(selectColumn, 'surface_water');
    userEvent.selectOptions(selectCompare, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '10');
    userEvent.click(filterBtn);
    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(3);
      expect(screen.getAllByRole('cell')).toHaveLength(39);
    });
    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectCompare, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '400');
    userEvent.click(filterBtn);
    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(26);
    });
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectCompare, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '12120');
    userEvent.click(filterBtn);
    await waitFor( () => {
      expect(selectColumn.children).toHaveLength(1);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const filterBtns = screen.getAllByTestId('rmv-filter');
      expect(filterBtns).toHaveLength(4);
      userEvent.click(filterBtns[3]);
    });
    const filterBtns2 = await screen.findAllByTestId('rmv-filter');
    expect(filterBtns2).toHaveLength(3);
    userEvent.click(filterBtns2[2]);
    await waitFor(() => {
      const filterBtns = screen.getAllByTestId('rmv-filter');
      expect(filterBtns).toHaveLength(2);
      userEvent.click(filterBtns[1]);
    });
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectCompare, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '12120');
    userEvent.click(filterBtn);
    await waitFor(() => {
      const filterBtns = screen.getAllByTestId('rmv-filter');
      expect(filterBtns).toHaveLength(2);
      userEvent.click(filterBtns[1]);
    });
  });
})

