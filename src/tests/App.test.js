import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Provider from '../contexts/Provider';
import mockData from '../tests/helpers/mockData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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
    userEvent.clear(nameFilter);
    userEvent.type(nameFilter, 'a');

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
    })
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
    const buttonAddFilter = await screen.findByRole('button', {  name: /filtrar/i});
    const buttonRemoveAllFilters = await screen.findByRole('button', {  name: /remover filtros/i});

    userEvent.selectOptions(selectColumn, 'population');
    expect(selectColumn).toHaveValue('population');

    userEvent.selectOptions(selectCompare, 'maior que');
    expect(selectCompare).toHaveValue('maior que');

    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '1000000');
    expect(valueFilter).toHaveValue(1000000);

    act(() => {
      userEvent.click(buttonAddFilter);
    });

    await waitFor(() => {
      expect(screen.queryByRole('cell', {  name: /hoth/i})).not.toBeInTheDocument();
      expect(screen.getByRole('cell', {  name: /alderaan/i})).toBeInTheDocument();
    });
    
    expect(screen.queryByDisplayValue('population')).not.toBeInTheDocument();

    const filter = screen.getByTestId('filter');
    expect(filter).toBeInTheDocument();
    expect(filter.firstChild).toHaveTextContent('population maior que 1000000');

    const buttonRemoveFilter = await screen.findByRole('button', {  name: /excluir/i});

    act(() => {
      userEvent.click(buttonRemoveFilter);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
      expect(selectColumn.children).toHaveLength(5);
    });

    userEvent.selectOptions(selectColumn, 'diameter');

    userEvent.selectOptions(selectCompare, 'menor que');

    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '8900');

    act(() => {
      userEvent.click(buttonAddFilter);
    });

    userEvent.selectOptions(selectColumn, 'orbital_period');

    userEvent.selectOptions(selectCompare, 'igual a');

    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '549');

    act(() => {
      userEvent.click(buttonAddFilter);
    });

    await waitFor(() => {
      expect(screen.getByRole('cell', {  name: /hoth/i})).toBeInTheDocument();
      expect(selectColumn.children).toHaveLength(3);
    });

    act(() => {
      userEvent.click(buttonRemoveAllFilters);
    });

    await waitFor(() => {
      expect(screen.getAllByRole('cell')).toHaveLength(130);
      expect(selectColumn.children).toHaveLength(5);
    });

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectCompare, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '10000');
    userEvent.click(buttonAddFilter);

    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(4);
      expect(screen.getAllByRole('cell')).toHaveLength(91);
      const buttonRemove = screen.getAllByTestId('rmv-filter');
      expect(buttonRemove).toHaveLength(1);
    });
    

    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectCompare, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '5000');
    userEvent.click(buttonAddFilter);

    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(3);
      expect(screen.getAllByRole('cell')).toHaveLength(78);
      const buttonRemove = screen.getAllByTestId('rmv-filter');
      expect(buttonRemove).toHaveLength(2);
    });

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectCompare, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '12500');
    userEvent.click(buttonAddFilter);

    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const buttonRemove = screen.getAllByTestId('rmv-filter');
      expect(buttonRemove).toHaveLength(3);
    });

    userEvent.selectOptions(selectColumn, 'surface_water');
    userEvent.selectOptions(selectCompare, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '39');
    userEvent.click(buttonAddFilter);

    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(1);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const buttonRemove = screen.getAllByTestId('rmv-filter');
      expect(buttonRemove).toHaveLength(4);
    });
    
    const buttonRmv = await screen.findAllByTestId('rmv-filter');

    userEvent.click(buttonRmv[3]);

    await waitFor(() => {
      expect(selectColumn.children).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const buttonRemove = screen.getAllByTestId('rmv-filter');
      expect(buttonRemove).toHaveLength(3);
    });
    
  });
})

