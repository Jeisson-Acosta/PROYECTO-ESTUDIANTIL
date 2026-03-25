import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Button,
  Stack,
  Chip
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  Event
} from '@mui/icons-material';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // Septiembre 2025 (mes 8)
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    let days = [];
    
    // Espacios vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
      days.push(<Grid item xs={12/7} key={`empty-${i}`} sx={{ height: 60 }} />);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === currentDate.getMonth() && 
        today.getFullYear() === currentDate.getFullYear();
      
      const hasEvent = day === 15 || day === 20; // Ejemplo de días con eventos
      
      days.push(
        <Grid item xs={12/7} key={day}>
          <Paper
            elevation={0}
            sx={{
              height: 60,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: isToday ? 'primary.light' : 'transparent',
              border: hasEvent ? '2px solid' : '1px solid',
              borderColor: hasEvent ? 'secondary.main' : 'divider',
              borderRadius: 1,
              position: 'relative',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: isToday ? 'bold' : 'normal',
                color: isToday ? 'primary.contrastText' : 'text.primary'
              }}
            >
              {day}
            </Typography>
            {hasEvent && (
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '0.6rem',
                  color: 'secondary.main',
                  position: 'absolute',
                  bottom: 2
                }}
              >
                ●
              </Typography>
            )}
          </Paper>
        </Grid>
      );
    }
    
    return days;
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        
        <Box>
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={handleToday} size="small" sx={{ mx: 1 }}>
            <Today />
          </IconButton>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
      
      {/* Días de la semana */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {dayNames.map((day, index) => (
          <Grid item xs={12/7} key={index}>
            <Typography 
              variant="subtitle2" 
              align="center"
              sx={{ 
                fontWeight: 'bold',
                color: index === 0 || index === 6 ? 'error.main' : 'text.secondary'
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
      
      {/* Días del mes */}
      <Grid container spacing={1}>
        {renderCalendar()}
      </Grid>
      
      {/* Leyenda */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
        <Chip 
          icon={<Today fontSize="small" />} 
          label="HOY" 
          size="small"
          sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
        />
        <Chip 
          icon={<Event fontSize="small" />} 
          label="EVENTO" 
          size="small"
          variant="outlined"
          color="secondary"
        />
      </Stack>
    </Paper>
  );
};

export default Calendar;