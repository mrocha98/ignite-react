import { Timer, Scroll } from 'phosphor-react';
import * as S from './header.styles';
import logoIgniteUrl from '../../assets/logo-ignite.svg';

export default function Header() {
  return (
    <S.HeaderContainer>
      <img src={logoIgniteUrl} alt="" />

      <S.Nav>
        <S.Anchor to="/" title="timer">
          <Timer size={24} />
        </S.Anchor>
        <S.Anchor to="/history" title="histórico">
          <Scroll size={24} />
        </S.Anchor>
      </S.Nav>
    </S.HeaderContainer>
  );
}
